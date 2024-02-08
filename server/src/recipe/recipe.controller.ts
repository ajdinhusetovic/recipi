import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { AuthGuard } from '../user/guards/auth.guard';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Get()
  async getRecipe() {
    return 'foo';
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRecipe(@Body('recipe') createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    return await this.recipeService.createRecipe(createRecipeDto);
  }
}
