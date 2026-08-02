import * as bcrypt from 'bcryptjs';

export const SALT_ROUNDS = 10;

const BCRYPT_HASH_PATTERN = /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/;

export function isHashed(password: string): boolean {
  return BCRYPT_HASH_PATTERN.test(password);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  if (!hash) return false;

  return bcrypt.compare(password, hash);
}
