import { Line } from 'src/helpers/typeorm/entities/line.entity';
import { Machine } from 'src/helpers/typeorm/entities/machine.entity';
import { Record } from 'src/helpers/typeorm/entities/record.entity';
import { User } from 'src/helpers/typeorm/entities/user.entity';
import AppDataSource from 'src/config/data-source';
import { hashPassword } from 'src/utils/password';

async function seed() {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  const userRepo = AppDataSource.getRepository(User);
  const lineRepo = AppDataSource.getRepository(Line);
  const machineRepo = AppDataSource.getRepository(Machine);
  const recordRepo = AppDataSource.getRepository(Record);

  console.log('🔁 Clearing data...');
  await recordRepo.deleteAll();
  await machineRepo.deleteAll();
  await userRepo.deleteAll();
  await lineRepo.deleteAll();

  console.log('🌱 Seeding data...');

  const seedPassword = await hashPassword('1234567');

  // Lines
  const line1 = lineRepo.create({ name: 'Line A' });
  const line2 = lineRepo.create({ name: 'Line B' });
  await lineRepo.save([line1, line2]);

  // Admin User
  const admin = userRepo.create({
    idNumber: 1,
    name: 'Tiago Pimenta Costa',
    role: 'admin',
    username: 'Tiago',
    password: seedPassword,
    cc: '12345678',
    nif: '987654321',
    phone: '912345678',
    email: 'admin@factory.com',
    admission: new Date(),
  });
  await userRepo.save(admin);

  // Regular Users
  const users = await userRepo.save([
    userRepo.create({
      idNumber: 2,
      name: 'Maria Fátima Costa',
      role: 'user',
      username: 'Maria Costa',
      password: seedPassword,
      cc: '22345678',
      nif: '887654321',
      phone: '912345679',
      email: 'worker1@factory.com',
      admission: new Date(),
    }),
    userRepo.create({
      idNumber: 3,
      name: 'Maria Fátima Braga',
      role: 'user',
      username: 'Maria Braga',
      password: seedPassword,
      cc: '32345678',
      nif: '787654321',
      phone: '912345680',
      email: 'worker2@factory.com',
      admission: new Date(),
    }),
  ]);

  // Machines
  const machines = await machineRepo.save([
    machineRepo.create({
      name: 'Machine A1',
      cadence: 10,
      line: line1,
      user: users[0],
    }),
    machineRepo.create({
      name: 'Machine A2',
      cadence: 12,
      line: line1,
      user: users[1],
    }),
    machineRepo.create({
      name: 'Machine B1',
      cadence: 9,
      line: line2,
      user: users[0],
    }),
    machineRepo.create({
      name: 'Machine B2',
      cadence: 11,
      line: line2,
      user: users[1],
    }),
  ]);

  // Records for Worker One (simulate one work day for one machine)
  const recordDay = new Date();
  const intervals = [
    { hour: 8, minute: 30 },
    { hour: 9, minute: 15 },
    { hour: 9, minute: 30 },
    { hour: 10, minute: 15 },
    { hour: 10, minute: 30 },
    { hour: 10, minute: 45 },
    { hour: 11, minute: 15 },
    { hour: 11, minute: 30 },
    { hour: 13, minute: 15 },
    { hour: 13, minute: 30 },
    { hour: 13, minute: 45 },
    { hour: 14, minute: 15 },
    { hour: 14, minute: 30 },
    { hour: 15, minute: 0 },
    { hour: 15, minute: 15 },
    { hour: 16, minute: 0 },
  ];

  const records: Record[] = [];

  intervals.forEach(({ hour, minute }) => {
    const date = new Date(recordDay);
    date.setHours(hour, minute, 0, 0);

    const isMorning = hour < 12;

    const user = isMorning ? users[0] : users[1];
    const machine = isMorning ? machines[0] : machines[1];

    records.push(
      recordRepo.create({
        user,
        machine,
        createdAt: date,
      }),
    );
  });

  await recordRepo.save(records);

  console.log('✅ Seeding completed.');
  process.exit(0);
}

seed().catch((e) => {
  console.error('❌ Error seeding:', e);
  process.exit(1);
});
