import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly instructions: string;

  @IsNotEmpty()
  readonly tags: string[];

  @IsNotEmpty()
  readonly steps: string[];

  readonly videoLink: string;
  readonly recipeArea: string;
  readonly image: string;
}
