export class UpdateRecipeDto {
  readonly name: string;
  readonly tags: string[];
  readonly instructions: string;
  readonly videoLink: string;
  readonly recipeArea: string;
  readonly image: string;
}
