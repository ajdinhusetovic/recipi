import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigAppModule } from 'config/config.module';
import ormconfig from './ormconfig';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigAppModule, TypeOrmModule.forRoot(ormconfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}