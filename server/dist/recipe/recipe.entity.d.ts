import { UserEntity } from '../user/user.entity';
export declare class RecipeEntity {
    id: number;
    slug: string;
    name: string;
    tags: string[];
    instructions: string;
    videoLink: string;
    recipeArea: string;
    image: string;
    user: UserEntity;
}
