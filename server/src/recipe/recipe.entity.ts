import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'recipes' })
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

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

  @ManyToOne(() => UserEntity, (user) => user.recipes, { eager: true })
  user: UserEntity;
}
