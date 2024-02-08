import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/CreateRecipeDto';

@Injectable()
export class RecipeService {
  constructor(@InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>) {}

  async getAllRecipes() {
    const recipes = await this.recipeRepository.find();

    const recipeCount = recipes.length;

    return { results: recipeCount, recipes };
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    const newRecipe = new RecipeEntity();

    Object.assign(newRecipe, createRecipeDto);

    return await this.recipeRepository.save(newRecipe);
  }
}
