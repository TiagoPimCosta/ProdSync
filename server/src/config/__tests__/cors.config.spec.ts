import { ConfigService } from '@nestjs/config';
import { DEFAULT_DEV_ORIGINS, getCorsOptions } from '../cors.config';

const configServiceWith = (env: Record<string, string>) =>
  ({ get: (key: string) => env[key] }) as ConfigService;

describe('getCorsOptions', () => {
  it('reads the allowed origins from CORS_ORIGINS', () => {
    const options = getCorsOptions(
      configServiceWith({
        CORS_ORIGINS: 'https://app.prodsync.com,https://admin.prodsync.com',
      }),
    );

    expect(options).toEqual({
      origin: ['https://app.prodsync.com', 'https://admin.prodsync.com'],
      credentials: true,
    });
  });

  it('trims whitespace and ignores empty entries', () => {
    const options = getCorsOptions(
      configServiceWith({
        CORS_ORIGINS:
          ' https://app.prodsync.com , ,https://admin.prodsync.com ',
      }),
    );

    expect(options.origin).toEqual([
      'https://app.prodsync.com',
      'https://admin.prodsync.com',
    ]);
  });

  it('falls back to the local client origin outside production', () => {
    const options = getCorsOptions(configServiceWith({}));

    expect(options).toEqual({
      origin: DEFAULT_DEV_ORIGINS,
      credentials: true,
    });
  });

  it('throws when CORS_ORIGINS is missing in production', () => {
    expect(() =>
      getCorsOptions(configServiceWith({ NODE_ENV: 'production' })),
    ).toThrow('CORS_ORIGINS is not set');
  });

  it('never reflects an arbitrary origin', () => {
    const options = getCorsOptions(
      configServiceWith({ CORS_ORIGINS: 'https://app.prodsync.com' }),
    );

    expect(options.origin).not.toBe(true);
  });
});
