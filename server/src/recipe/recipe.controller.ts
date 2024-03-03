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
  Query,
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
    return await this.recipeService.getAllRecipes();
  }

  @Get('search')
  async searchRecipesAndUsers(@Query('query') query: string) {
    return await this.recipeService.searchRecipesAndUsers(query);
  }

  @Get(':slug')
  async getRecipe(@Param('slug') slug: string) {
    return await this.recipeService.getRecipe(slug);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async createRecipe(
    @User('id') currentUserId: number,
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile(
      new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: 'image/jpeg' })], fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ): Promise<RecipeEntity> {
    if (file) {
      return await this.recipeService.createRecipe(currentUserId, createRecipeDto, file.originalname, file.buffer);
    }

    return await this.recipeService.createRecipe(currentUserId, createRecipeDto);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteRecipe(@User('id') currentUserId: number, @Param('slug') slug: string) {
    return this.recipeService.deleteRecipe(currentUserId, slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async updateRecipe(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFile(
      new ParseFilePipe({ validators: [new FileTypeValidator({ fileType: 'image/jpeg' })], fileIsRequired: false }),
    )
    file: Express.Multer.File,
  ): Promise<RecipeEntity> {
    if (file) {
      return await this.recipeService.updateRecipe(
        currentUserId,
        slug,
        updateRecipeDto,
        file.originalname,
        file.buffer,
      );
    }

    return await this.recipeService.updateRecipe(currentUserId, slug, updateRecipeDto);
  }

  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addRecipeToFavorites(@User('id') currentUserId: number, @Param('slug') slug: string) {
    return await this.recipeService.addRecipeToFavorites(slug, currentUserId);
  }

  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async removeRecipeFromFavorites(@User('id') currentUserId: number, @Param('slug') slug: string) {
    return await this.recipeService.removeRecipeFromFavorites(slug, currentUserId);
  }
}
