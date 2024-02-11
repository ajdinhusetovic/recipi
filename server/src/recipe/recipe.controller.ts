import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { AuthGuard } from '../user/guards/auth.guard';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';
import { User } from '../user/decorators/user.decorator';
import { UpdateRecipeDto } from './dto/UpdateRecipeDto';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('file'))
  async createRecipe(
    @User('id') currentUserId: number,
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile(new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: 'image/jpeg' })] }))
    file: Express.Multer.File,
  ): Promise<RecipeEntity> {
    return await this.recipeService.createRecipe(currentUserId, createRecipeDto, file.originalname, file.buffer);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteRecipe(@User('id') currentUserId: number, @Param('slug') slug: string) {
    return this.recipeService.deleteRecipe(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateRecipe(
    @User('id') currentUserId: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Param('slug') slug: string,
  ) {
    return await this.recipeService.updateRecipe(currentUserId, slug, updateRecipeDto);
  }
}
