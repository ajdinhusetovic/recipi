export class UpdateRecipeDto {
  readonly name: string;
  readonly instructions: string;
  readonly tags: string[];
  readonly steps: string[];
  readonly videoLink: string;
  readonly difficulty: string;
  readonly servings: number;
  readonly image: string;
  readonly description: string;
  readonly cookTime: number;
  readonly prepTime: number;
  readonly notes: string;
}
