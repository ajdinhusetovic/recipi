import { UserEntity } from '../user/user.entity';
import { StepEntity } from 'src/step/step.entity';
export declare class RecipeEntity {
    id: number;
    slug: string;
    name: string;
    description: string;
    ingredients: string[];
    difficulty: string;
    tags: string[];
    videoLink: string;
    prepTime: number;
    cookTime: number;
    favoritesCount: number;
    favorited: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    similarRecipes: RecipeEntity[];
    steps: StepEntity[];
    user: UserEntity;
}
