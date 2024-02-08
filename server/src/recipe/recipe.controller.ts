import { Controller, Get } from '@nestjs/common';

@Controller('recipes')
export class RecipeController {
  @Get()
  async getRecipe() {
    return 'foo';
  }
}
