import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: configService.get<string>('PGHOST'),
  username: configService.get<string>('PGUSER'),
  password: configService.get<string>('PGPASSWORD'),
  database: configService.get<string>('PGDATABASE'),
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export default config;
