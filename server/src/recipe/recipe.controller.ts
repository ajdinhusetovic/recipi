import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { AuthGuard } from '../user/guards/auth.guard';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';
import { User } from '../user/decorators/user.decorator';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Get()
  async getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createRecipe(
    @User('id') currentUserId: number,
    @Body('recipe') createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeEntity> {
    return await this.recipeService.createRecipe(currentUserId, createRecipeDto);
  }
}
