require('dotenv').config();
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './data-source.options';

/**
 * DataSource used by the TypeORM CLI (`pnpm migration:generate`,
 * `pnpm migration:run`, `pnpm migration:revert`) and by the seed scripts.
 * The running app builds the same options through `ConfigService`.
 */
const AppDataSource = new DataSource(buildDataSourceOptions(process.env));

export default AppDataSource;
