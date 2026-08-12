import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export type DbEnv = {
  DB_HOST?: string;
  DB_PORT?: string | number;
  DB_USERNAME?: string;
  DB_PASSWORD?: string;
  DB_DATABASE?: string;
  NODE_ENV?: string;
  DB_SYNCHRONIZE?: string;
  DB_RUN_MIGRATIONS?: string;
};

export const DEFAULT_DB_PORT = 3306;

/**
 * Single source of truth for the TypeORM connection. The Nest module, the CLI
 * data source used by the migration scripts, and the seed scripts all build
 * their options from here so they can never drift apart.
 *
 * `synchronize` is off by default: the schema is owned by the migrations in
 * `src/migrations`. It can only be turned back on outside production, by
 * setting `DB_SYNCHRONIZE=true` explicitly. Pending migrations are applied at
 * boot instead, unless `DB_RUN_MIGRATIONS=false` (deployments that prefer to
 * run `pnpm migration:run` as a separate release step).
 */
export const buildDataSourceOptions = (env: DbEnv): MysqlConnectionOptions => ({
  type: 'mysql',
  host: env.DB_HOST,
  port: Number(env.DB_PORT) || DEFAULT_DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  synchronize: isSynchronizeEnabled(env),
  migrationsRun: isRunMigrationsEnabled(env),
});

export const isSynchronizeEnabled = (env: DbEnv): boolean => {
  if (env.NODE_ENV === 'production') return false;

  return env.DB_SYNCHRONIZE === 'true';
};

export const isRunMigrationsEnabled = (env: DbEnv): boolean =>
  env.DB_RUN_MIGRATIONS !== 'false';
