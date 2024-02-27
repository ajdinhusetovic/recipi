export class UpdateRecipeDto {
  readonly name: string;
  readonly instructions: string;
  readonly tags: string[];
  readonly steps: string[];
  readonly videoLink: string;
  readonly recipeArea: string;
  readonly image: string;
  readonly description: string;
  readonly cookTime: number;
}
