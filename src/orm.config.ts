import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: 'postgres',
    host: config.get('POSTGRES_HOST') as string,
    username: config.get('POSTGRES_USER') as string,
    password: config.get('POSTGRES_PASSWORD') as string,
    database: config.get('POSTGRES_DB') as string,
    port: config.get('POSTGRES_PORT') as number,
    entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: true,
    migrationsTableName: 'migration',
    migrations: [
      __dirname + '/migrations/**/*.ts',
      __dirname + '/migrations/**/*.js',
    ],
    cli: {
      migrationsDir: 'src/migrations',
    },
  }),
} as TypeOrmModuleOptions;
