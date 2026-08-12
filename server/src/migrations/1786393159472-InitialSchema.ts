import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Baseline of the schema `synchronize: true` used to create. Databases that
 * predate migrations already hold these tables, so the migration no-ops there
 * and only records itself as applied.
 */
export class InitialSchema1786393159472 implements MigrationInterface {
  name = 'InitialSchema1786393159472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('users')) return;

    await queryRunner.query(
      `CREATE TABLE \`lines\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e00c638fdac01816ea68e225bb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`machines\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`cadence\` int NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`userId\` varchar(36) NULL, \`lineId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`records\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`userId\` varchar(36) NULL, \`machineId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`idNumber\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`cc\` varchar(255) NOT NULL, \`nif\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 1, \`admission\` datetime NULL, UNIQUE INDEX \`IDX_400332f5c67d8a42d92c83f113\` (\`idNumber\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_d263787f6451d338a59c01d06d\` (\`cc\`), UNIQUE INDEX \`IDX_0784de24b7a4673630d6964777\` (\`nif\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`machines\` ADD CONSTRAINT \`FK_45fb0bdf6098ba93f062c869bc3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`machines\` ADD CONSTRAINT \`FK_cddf78cddd88cb0b30d1ab34186\` FOREIGN KEY (\`lineId\`) REFERENCES \`lines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`FK_b392510e8a9898d395a871bd9cf\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`records\` ADD CONSTRAINT \`FK_ee9b89a275abf6bfcfa8473bc60\` FOREIGN KEY (\`machineId\`) REFERENCES \`machines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`records\` DROP FOREIGN KEY \`FK_ee9b89a275abf6bfcfa8473bc60\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`records\` DROP FOREIGN KEY \`FK_b392510e8a9898d395a871bd9cf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`machines\` DROP FOREIGN KEY \`FK_cddf78cddd88cb0b30d1ab34186\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`machines\` DROP FOREIGN KEY \`FK_45fb0bdf6098ba93f062c869bc3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0784de24b7a4673630d6964777\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_d263787f6451d338a59c01d06d\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_400332f5c67d8a42d92c83f113\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`records\``);
    await queryRunner.query(`DROP TABLE \`machines\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e00c638fdac01816ea68e225bb\` ON \`lines\``,
    );
    await queryRunner.query(`DROP TABLE \`lines\``);
  }
}
