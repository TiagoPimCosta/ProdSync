import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const DEFAULT_DEV_ORIGINS = ['http://localhost:3000'];

export const getCorsOptions = (configService: ConfigService): CorsOptions => {
  const origins = (configService.get<string>('CORS_ORIGINS') ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!origins.length) {
    if (configService.get<string>('NODE_ENV') === 'production') {
      throw new Error('CORS_ORIGINS is not set');
    }

    return { origin: DEFAULT_DEV_ORIGINS, credentials: true };
  }

  return { origin: origins, credentials: true };
};
