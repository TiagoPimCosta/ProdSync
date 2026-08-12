import {
  DEFAULT_DB_PORT,
  buildDataSourceOptions,
  isRunMigrationsEnabled,
  isSynchronizeEnabled,
} from '../data-source.options';

const baseEnv = {
  DB_HOST: 'database',
  DB_PORT: '3306',
  DB_USERNAME: 'root',
  DB_PASSWORD: 'root',
  DB_DATABASE: 'ProductionManager',
};

describe('buildDataSourceOptions', () => {
  it('maps the database env vars onto the mysql connection', () => {
    const options = buildDataSourceOptions(baseEnv);

    expect(options).toMatchObject({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ProductionManager',
    });
  });

  it('falls back to the default port when DB_PORT is missing or invalid', () => {
    expect(
      buildDataSourceOptions({ ...baseEnv, DB_PORT: undefined }).port,
    ).toBe(DEFAULT_DB_PORT);
    expect(buildDataSourceOptions({ ...baseEnv, DB_PORT: 'nope' }).port).toBe(
      DEFAULT_DB_PORT,
    );
  });

  it('registers the migrations directory and table', () => {
    const options = buildDataSourceOptions(baseEnv);

    expect(options.migrationsTableName).toBe('migrations');
    expect(String(options.migrations[0])).toContain('migrations');
  });

  it('never synchronizes by default, and runs migrations instead', () => {
    const options = buildDataSourceOptions(baseEnv);

    expect(options.synchronize).toBe(false);
    expect(options.migrationsRun).toBe(true);
  });
});

describe('isRunMigrationsEnabled', () => {
  it('runs pending migrations at boot by default', () => {
    expect(isRunMigrationsEnabled({})).toBe(true);
  });

  it('can be turned off for deployments that migrate as a release step', () => {
    expect(isRunMigrationsEnabled({ DB_RUN_MIGRATIONS: 'false' })).toBe(false);
  });
});

describe('isSynchronizeEnabled', () => {
  it('is off unless DB_SYNCHRONIZE is explicitly true', () => {
    expect(isSynchronizeEnabled({})).toBe(false);
    expect(isSynchronizeEnabled({ DB_SYNCHRONIZE: 'false' })).toBe(false);
    expect(isSynchronizeEnabled({ DB_SYNCHRONIZE: '1' })).toBe(false);
  });

  it('can be opted into outside production', () => {
    expect(
      isSynchronizeEnabled({ NODE_ENV: 'development', DB_SYNCHRONIZE: 'true' }),
    ).toBe(true);
  });

  it('stays off in production even when DB_SYNCHRONIZE is true', () => {
    expect(
      isSynchronizeEnabled({ NODE_ENV: 'production', DB_SYNCHRONIZE: 'true' }),
    ).toBe(false);
  });
});
