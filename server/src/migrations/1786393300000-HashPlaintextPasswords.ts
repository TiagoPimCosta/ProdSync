import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword, isHashed } from '../utils/password';

/**
 * Backfill for PS-43: rows written before passwords were hashed still hold
 * plaintext. Rehashes those and leaves rows that already carry a bcrypt hash
 * alone, so it is safe on a database seeded either way.
 *
 * Irreversible by design — `down` cannot recover the plaintext.
 */
export class HashPlaintextPasswords1786393300000 implements MigrationInterface {
  name = 'HashPlaintextPasswords1786393300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const users: { id: string; password: string }[] = await queryRunner.query(
      'SELECT `id`, `password` FROM `users`',
    );

    for (const user of users) {
      if (!user.password || isHashed(user.password)) continue;

      await queryRunner.query(
        'UPDATE `users` SET `password` = ? WHERE `id` = ?',
        [await hashPassword(user.password), user.id],
      );
    }
  }

  public async down(): Promise<void> {
    // No-op: hashing is one-way.
  }
}
