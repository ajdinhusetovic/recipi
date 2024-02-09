import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllRecipes() {
    const recipes = await this.recipeRepository.find({ relations: ['user'] });

    const recipeCount = recipes.length;

    return { results: recipeCount, recipes };
  }

  async createRecipe(currentUserId: number, createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    const user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const newRecipe = { ...createRecipeDto };

    const recipe = this.recipeRepository.create({ ...newRecipe, user });
    return await this.recipeRepository.save(recipe);
  }

  async deleteRecipe(currentUserId: number, title: string) {
    const recipe = await this.recipeRepository.findOne({ where: { name: title } });

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }

    if (recipe.user.id !== currentUserId) {
      throw new HttpException('You are not the owner of this recipe', HttpStatus.FORBIDDEN);
    }

    return await this.recipeRepository.delete(recipe.id);
  }
}
