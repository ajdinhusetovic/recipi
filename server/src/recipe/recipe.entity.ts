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

  @Column({ default: '' })
  videoLink: string;

  @Column({ default: '' })
  recipeArea: string;

  @Column({ default: '' })
  image: string;
}
