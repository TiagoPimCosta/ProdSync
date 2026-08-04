require('dotenv').config();
import { Line } from 'src/helpers/typeorm/entities/line.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import { DataSource } from 'typeorm';
import { hashPassword, isHashed } from 'src/utils/password';

/**
 * One-off backfill: re-hashes every plaintext password already in the users
 * table. Safe to run more than once — rows that already hold a bcrypt hash are
 * skipped. Replace with a proper TypeORM migration once PS-51 is worked on.
 */
const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Line, Machine, Record],
});

async function hashExistingPasswords() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);

  const users = await userRepo.find();
  let hashed = 0;

  for (const user of users) {
    if (!user.password || isHashed(user.password)) continue;

    await userRepo.update(
      { id: user.id },
      { password: await hashPassword(user.password) },
    );
    hashed++;
  }

  console.log(
    `Hashed ${hashed} password(s); ${users.length - hashed} already hashed.`,
  );
  await AppDataSource.destroy();
}

hashExistingPasswords().catch((error) => {
  console.error('❌ Failed to hash passwords:', error);
  process.exit(1);
});
