import { Module } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.services';
import { AuthGuard } from './guards/auth.guard';
import { RecipeEntity } from 'src/recipe/recipe.entity';
import { StepEntity } from 'src/step/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RecipeEntity, StepEntity])],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule {}
