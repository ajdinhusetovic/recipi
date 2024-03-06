import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { StepEntity } from 'src/step/step.entity';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('simple-array')
  ingredients: string[];

  @Column()
  difficulty: string;

  @Column('simple-array')
  tags: string[];

  @Column({ default: '' })
  videoLink: string;

  @Column()
  prepTime: number;

  @Column()
  cookTime: number;

  @Column({ default: 0 })
  favoritesCount: number;

  @Column({ default: false })
  favorited: boolean;

  @Column({ default: '' })
  image: string;

  @ManyToMany(() => RecipeEntity, { cascade: true })
  @JoinTable()
  similarRecipes: RecipeEntity[];

  @OneToMany(() => StepEntity, (step) => step.recipe, { cascade: true })
  steps: StepEntity[];

  @ManyToOne(() => UserEntity, (user) => user.recipes, { eager: true })
  user: UserEntity;
}
