import { RecipeStep } from "./StepInterface";
import { User } from "./UserInterface";

export interface Recipe {
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
  createdAt: string;
  updatedAt: string;
  user: User;
  steps: RecipeStep[];
}
