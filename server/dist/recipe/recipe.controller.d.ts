/// <reference types="multer" />
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './recipe.entity';
import { UpdateRecipeDto } from './dto/UpdateRecipeDto';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    getAllRecipes(): Promise<{
        results: number;
        recipes: RecipeEntity[];
    }>;
    searchRecipesAndUsers(query: string): Promise<{
        tags: RecipeEntity[];
        recipes: RecipeEntity[];
    }>;
    getRecipe(slug: string): Promise<RecipeEntity>;
    createRecipe(currentUserId: number, createRecipeDto: CreateRecipeDto, file: Express.Multer.File): Promise<RecipeEntity>;
    deleteRecipe(currentUserId: number, slug: string): Promise<import("typeorm").DeleteResult>;
    updateRecipe(currentUserId: number, slug: string, updateRecipeDto: UpdateRecipeDto, file: Express.Multer.File): Promise<RecipeEntity>;
    addRecipeToFavorites(currentUserId: number, slug: string): Promise<RecipeEntity>;
    removeRecipeFromFavorites(currentUserId: number, slug: string): Promise<RecipeEntity>;
}
