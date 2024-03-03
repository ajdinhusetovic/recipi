import 'dotenv/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DataSource, ILike, Not, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { UserEntity } from '../user/user.entity';
import { UpdateRecipeDto } from './dto/UpdateRecipeDto';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import slugify from 'slugify';
import { StepEntity } from 'src/step/step.entity';

@Injectable()
export class RecipeService {
  private readonly s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
  constructor(
    @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StepEntity) private readonly stepRepository: Repository<StepEntity>,
    private dataSource: DataSource,
  ) {}

  async getAllRecipes() {
    const recipes = await this.recipeRepository.find({ relations: ['user', 'steps'] });

    const recipeCount = recipes.length;

    return { results: recipeCount, recipes };
  }

  async getRecipe(slug: string) {
    const recipe = await this.recipeRepository.findOne({
      where: { slug },
      relations: ['steps', 'similarRecipes'],
    });

    if (!recipe) {
      throw new HttpException('Recipe does not exist', HttpStatus.NOT_FOUND);
    }

    const allRecipes = await this.recipeRepository.find({ relations: ['steps'], where: { id: Not(recipe.id) } });

    const similarRecipes = allRecipes.filter((similarRecipe) =>
      recipe.name.split(' ').some((recipeName) => similarRecipe.name.includes(recipeName)),
    );

    recipe.similarRecipes = similarRecipes;

    return recipe;
  }

  async createRecipe(
    currentUserId: number,
    createRecipeDto: CreateRecipeDto,
    fileName?: string,
    file?: Buffer,
  ): Promise<RecipeEntity> {
    const user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const newRecipe = { ...createRecipeDto };
    let recipe;

    if (file && fileName) {
      await this.s3Client.send(new PutObjectCommand({ Bucket: 'recipiebucket', Key: fileName, Body: file }));
      recipe = this.recipeRepository.create({
        ...newRecipe,
        user,
        image: `https://recipiebucket.s3.amazonaws.com/${fileName}`,
        steps: [],
      });
    } else {
      recipe = this.recipeRepository.create({
        ...newRecipe,
        user,
        steps: [],
      });
    }

    recipe.slug = slugify(recipe.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);

    const savedRecipe = await this.recipeRepository.save(recipe);

    if (createRecipeDto.steps && createRecipeDto.steps.length > 0) {
      const steps = createRecipeDto.steps.map((stepInstruction, index) =>
        this.stepRepository.create({
          instruction: stepInstruction,
          stepNumber: index + 1,
          recipe: savedRecipe,
        }),
      );

      await this.stepRepository.save(steps);

      savedRecipe.steps = steps;
    }

    return savedRecipe;
  }

  async deleteRecipe(currentUserId: number, slug: string) {
    const recipe = await this.recipeRepository.findOne({ where: { slug } });

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }

    if (recipe.user.id !== currentUserId) {
      throw new HttpException('You are not the owner of this recipe', HttpStatus.FORBIDDEN);
    }

    await this.stepRepository.delete({ recipe: recipe });

    if (recipe.image) {
      const url = recipe.image;

      const urlParts = url.split('/');
      const objectKey = urlParts.slice(3).join('/');
      console.log(objectKey);

      await this.s3Client.send(new DeleteObjectCommand({ Bucket: 'recipiebucket', Key: objectKey }));
    }

    return await this.recipeRepository.delete({ slug });
  }

  async updateRecipe(
    currentUserId: number,
    slug: string,
    updateRecipeDto: UpdateRecipeDto,
    fileName?: string,
    file?: Buffer,
  ): Promise<RecipeEntity> {
    const user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const existingRecipe = await this.recipeRepository.findOne({
      where: { slug: slug, user: { id: currentUserId } },
      relations: ['steps'],
    });

    if (!existingRecipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(existingRecipe, updateRecipeDto);

    if (file && fileName) {
      await this.s3Client.send(new PutObjectCommand({ Bucket: 'recipiebucket', Key: fileName, Body: file }));
      existingRecipe.image = `https://recipiebucket.s3.amazonaws.com/${fileName}`;
    }

    const updatedSteps = updateRecipeDto.steps.map((stepInstruction, index) =>
      this.stepRepository.create({
        instruction: stepInstruction,
        stepNumber: index + 1,
        recipe: existingRecipe,
      }),
    );

    const savedSteps = await this.stepRepository.save(updatedSteps);

    existingRecipe.steps = savedSteps;

    if (updateRecipeDto.name) {
      existingRecipe.slug =
        slugify(updateRecipeDto.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    }

    const updatedRecipe = await this.recipeRepository.save(existingRecipe);

    return updatedRecipe;
  }

  async addRecipeToFavorites(slug: string, currentUserId: number) {
    const recipe = await this.recipeRepository.findOne({ where: { slug } });
    const user = await this.userRepository.findOne({ where: { id: currentUserId }, relations: ['favorites'] });

    const isNotFavorited = user.favorites.findIndex((recipeInFavorites) => recipeInFavorites.id === recipe.id) === -1;

    if (isNotFavorited) {
      user.favorites.push(recipe);
      recipe.favoritesCount++;

      await this.userRepository.save(user);
      await this.recipeRepository.save(recipe);
    }

    return recipe;
  }

  async removeRecipeFromFavorites(slug: string, currentUserId: number) {
    const recipe = await this.recipeRepository.findOne({ where: { slug } });
    const user = await this.userRepository.findOne({ where: { id: currentUserId }, relations: ['favorites'] });

    const recipeIndex = user.favorites.findIndex((recipeInFavorites) => recipeInFavorites.id === recipe.id);

    if (recipeIndex >= 0) {
      user.favorites.splice(recipeIndex, 1);
      recipe.favoritesCount--;

      await this.userRepository.save(user);
      await this.recipeRepository.save(recipe);
    }

    return recipe;
  }

  async searchRecipesAndUsers(query: string) {
    console.log('Search');
    const userResults = await this.userRepository.find({
      where: {
        username: ILike(`%${query}%`),
      },
    });

    const recipeResults = await this.recipeRepository.find({
      where: {
        name: ILike(`%${query}%`),
      },
    });

    return {
      users: userResults,
      recipes: recipeResults,
    };
  }
}
