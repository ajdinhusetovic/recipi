import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeEntity } from 'src/recipe/recipe.entity';

@Entity({ name: 'steps' })
export class StepEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stepNumber: number;

  @Column()
  instruction: string;

  @ManyToOne(() => RecipeEntity, (recipe) => recipe.steps)
  recipe: RecipeEntity;
}
