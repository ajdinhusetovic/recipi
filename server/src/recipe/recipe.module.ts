import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { UserEntity } from '../user/user.entity';
import { StepEntity } from 'src/step/step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeEntity, UserEntity, StepEntity])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
