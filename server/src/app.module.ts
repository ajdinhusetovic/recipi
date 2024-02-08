import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UserModule } from './user/user.module';
import 'dotenv/config';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ormconfig), UserModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
