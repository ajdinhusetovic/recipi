import 'dotenv/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { DataSource, Repository } from 'typeorm';
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
    const recipe = await this.recipeRepository.findOne({ where: { slug } });

    if (!recipe) {
      throw new HttpException('Recipe does not exist', HttpStatus.NOT_FOUND);
    }

    return recipe;
  }

  async getFeed(currentUserId: number, query: any) {
    const queryBuilder = this.dataSource
      .getRepository(RecipeEntity)
      .createQueryBuilder('recipes')
      .leftJoinAndSelect('recipes.user', 'user');

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    const recipes = await queryBuilder.getMany();
    const recipesCount = await queryBuilder.getCount();

    return { recipesCount, recipes };
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
      // Create and associate steps with the recipe
      const steps = createRecipeDto.steps.map((stepInstruction, index) =>
        this.stepRepository.create({
          instruction: stepInstruction,
          stepNumber: index + 1, // 1-indexed step number
          recipe: savedRecipe, // Associate the step with the saved recipe
        }),
      );

      await this.stepRepository.save(steps);

      // Update the saved recipe with the associated steps
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

    if (recipe.image) {
      const url = recipe.image;

      const urlParts = url.split('/');
      const objectKey = urlParts.slice(3).join('/');
      console.log(objectKey);

      await this.s3Client.send(new DeleteObjectCommand({ Bucket: 'recipiebucket', Key: objectKey }));
    }

    return await this.recipeRepository.delete({ slug });
  }

  async updateRecipe(currentUserId: number, slug: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipeRepository.findOne({ where: { slug } });

    if (!recipe) {
      throw new HttpException('No recipe found', HttpStatus.NOT_FOUND);
    }

    if (recipe.user.id !== currentUserId) {
      throw new HttpException('You are not the recipe owner', HttpStatus.FORBIDDEN);
    }

    Object.assign(recipe, updateRecipeDto);

    recipe.slug = slugify(recipe.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);

    return await this.recipeRepository.save(recipe);
  }
}
