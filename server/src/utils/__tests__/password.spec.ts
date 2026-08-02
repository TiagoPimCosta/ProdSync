import { comparePassword, hashPassword, isHashed } from '../password';

describe('password', () => {
  it('hashes a password into something other than the plaintext', async () => {
    const hash = await hashPassword('1234567');

    expect(hash).not.toBe('1234567');
    expect(isHashed(hash)).toBe(true);
  });

  it('produces a different hash for the same password', async () => {
    const [first, second] = await Promise.all([
      hashPassword('1234567'),
      hashPassword('1234567'),
    ]);

    expect(first).not.toBe(second);
  });

  it('matches the original password', async () => {
    const hash = await hashPassword('1234567');

    await expect(comparePassword('1234567', hash)).resolves.toBe(true);
    await expect(comparePassword('7654321', hash)).resolves.toBe(false);
  });

  it('does not match against a missing hash', async () => {
    await expect(comparePassword('1234567', undefined)).resolves.toBe(false);
  });

  it('recognises plaintext as not hashed', () => {
    expect(isHashed('1234567')).toBe(false);
    expect(isHashed('')).toBe(false);
  });
});
