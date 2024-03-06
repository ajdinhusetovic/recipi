import { RecipeEntity } from 'src/recipe/recipe.entity';
export declare class StepEntity {
    id: number;
    stepNumber: number;
    instruction: string;
    recipe: RecipeEntity;
}
