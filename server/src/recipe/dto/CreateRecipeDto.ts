import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly tags: string[];

  @IsNotEmpty()
  readonly steps: string[];

  readonly description: string;
  readonly difficulty: string;
  readonly prepTime: number;
  readonly cookTime: number;
  readonly videoLink: string;
  readonly servings: number;
  readonly image: string;
  readonly notes: string;
}
