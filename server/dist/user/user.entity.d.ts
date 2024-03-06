import { RecipeEntity } from '../recipe/recipe.entity';
export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
    image: string;
    recipes: RecipeEntity[];
    favorites: RecipeEntity[];
    hashPassword(): Promise<void>;
}
