/// <reference types="node" />
import 'dotenv/config';
import { RecipeEntity } from './recipe.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { UserEntity } from '../user/user.entity';
import { UpdateRecipeDto } from './dto/UpdateRecipeDto';
import { StepEntity } from 'src/step/step.entity';
export declare class RecipeService {
    private readonly recipeRepository;
    private readonly userRepository;
    private readonly stepRepository;
    private dataSource;
    private readonly s3Client;
    constructor(recipeRepository: Repository<RecipeEntity>, userRepository: Repository<UserEntity>, stepRepository: Repository<StepEntity>, dataSource: DataSource);
    getAllRecipes(): Promise<{
        results: number;
        recipes: RecipeEntity[];
    }>;
    getRecipe(slug: string): Promise<RecipeEntity>;
    createRecipe(currentUserId: number, createRecipeDto: CreateRecipeDto, fileName?: string, file?: Buffer): Promise<RecipeEntity>;
    deleteRecipe(currentUserId: number, slug: string): Promise<import("typeorm").DeleteResult>;
    updateRecipe(currentUserId: number, slug: string, updateRecipeDto: UpdateRecipeDto, fileName?: string, file?: Buffer): Promise<RecipeEntity>;
    addRecipeToFavorites(slug: string, currentUserId: number): Promise<RecipeEntity>;
    removeRecipeFromFavorites(slug: string, currentUserId: number): Promise<RecipeEntity>;
    searchRecipesAndUsers(query: string): Promise<{
        tags: RecipeEntity[];
        recipes: RecipeEntity[];
    }>;
}
