import { ConfigService } from '@nestjs/config';

export const JWT_EXPIRES_IN = '1h';

export const getJwtSecret = (configService: ConfigService): string => {
  const secret = configService.get<string>('JWT_SECRET');

  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }

  return secret;
};
