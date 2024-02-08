import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  instructions: string;

  @Column()
  videoLink: string;

  @Column()
  recipeArea: string;

  @Column()
  image: string;
}
