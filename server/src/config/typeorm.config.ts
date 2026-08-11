import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { buildDataSourceOptions } from './data-source.options';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return buildDataSourceOptions({
      DB_HOST: configService.get('DB_HOST'),
      DB_PORT: configService.get('DB_PORT'),
      DB_USERNAME: configService.get('DB_USERNAME'),
      DB_PASSWORD: configService.get('DB_PASSWORD'),
      DB_DATABASE: configService.get('DB_DATABASE'),
      NODE_ENV: configService.get('NODE_ENV'),
      DB_SYNCHRONIZE: configService.get('DB_SYNCHRONIZE'),
      DB_RUN_MIGRATIONS: configService.get('DB_RUN_MIGRATIONS'),
    });
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
