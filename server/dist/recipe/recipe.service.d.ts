/// <reference types="node" />
import 'dotenv/config';
import { RecipeEntity } from './recipe.entity';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/CreateRecipeDto';
import { UserEntity } from '../user/user.entity';
import { UpdateRecipeDto } from './dto/UpdateRecipeDto';
export declare class RecipeService {
    private readonly recipeRepository;
    private readonly userRepository;
    private readonly s3Client;
    constructor(recipeRepository: Repository<RecipeEntity>, userRepository: Repository<UserEntity>);
    getAllRecipes(): Promise<{
        results: number;
        recipes: RecipeEntity[];
    }>;
    createRecipe(currentUserId: number, createRecipeDto: CreateRecipeDto, fileName: string, file: Buffer): Promise<RecipeEntity>;
    deleteRecipe(currentUserId: number, slug: string): Promise<import("typeorm").DeleteResult>;
    updateRecipe(currentUserId: number, slug: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity>;
}
