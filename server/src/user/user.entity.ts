import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { RecipeEntity } from '../recipe/recipe.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @OneToMany(() => RecipeEntity, (recipe) => recipe.user)
  recipes: RecipeEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
