import { MigrationInterface, QueryRunner } from 'typeorm';

type ReportingIndex = {
  name: string;
  columns: string[];
  /** Set when the leading column is a FK column — see `down`. */
  foreignKeyColumn?: string;
};

const INDEXES: ReportingIndex[] = [
  { name: 'IDX_records_createdAt', columns: ['createdAt'] },
  {
    name: 'IDX_records_user_createdAt',
    columns: ['userId', 'createdAt'],
    foreignKeyColumn: 'userId',
  },
  {
    name: 'IDX_records_machine_createdAt',
    columns: ['machineId', 'createdAt'],
    foreignKeyColumn: 'machineId',
  },
];

const TABLE = 'records';

export class AddRecordReportingIndexes1786393400000 implements MigrationInterface {
  name = 'AddRecordReportingIndexes1786393400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const index of INDEXES) {
      if (await this.indexExists(queryRunner, index.name)) continue;

      const columns = index.columns.map((column) => `\`${column}\``).join(', ');
      await queryRunner.query(
        `CREATE INDEX \`${index.name}\` ON \`${TABLE}\` (${columns})`,
      );

      if (index.foreignKeyColumn) {
        await this.dropRedundantForeignKeyIndex(
          queryRunner,
          index.foreignKeyColumn,
        );
      }
    }
  }

  /**
   * MySQL drops the index it auto-created for a FK as soon as a covering
   * composite exists, but not one `down` recreated explicitly. Dropping it
   * here keeps a revert-then-rerun cycle at the same schema as a first run.
   */
  private async dropRedundantForeignKeyIndex(
    queryRunner: QueryRunner,
    column: string,
  ): Promise<void> {
    const constraint = await this.foreignKeyName(queryRunner, column);
    if (!constraint) return;

    const columns: { COLUMN_NAME: string }[] = await queryRunner.query(
      'SELECT `column_name` AS `COLUMN_NAME` ' +
        'FROM `information_schema`.`statistics` ' +
        'WHERE `table_schema` = DATABASE() AND `table_name` = ? ' +
        'AND `index_name` = ? ORDER BY `seq_in_index`',
      [TABLE, constraint],
    );

    const isFkColumnOnly =
      columns.length === 1 && columns[0].COLUMN_NAME === column;
    if (!isFkColumnOnly) return;

    await queryRunner.query(`DROP INDEX \`${constraint}\` ON \`${TABLE}\``);
  }

  /**
   * Dropping a composite whose leading column is a FK column fails unless some
   * other index still covers that column: InnoDB requires one, and MySQL
   * silently drops the index it auto-created for the constraint as soon as
   * `up` adds a covering composite. So the constraint-named index is put back
   * first, restoring the shape the table had before `up` ran.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const index of [...INDEXES].reverse()) {
      if (!(await this.indexExists(queryRunner, index.name))) continue;

      if (
        index.foreignKeyColumn &&
        !(await this.hasOtherLeadingIndex(
          queryRunner,
          index.foreignKeyColumn,
          index.name,
        ))
      ) {
        const constraint = await this.foreignKeyName(
          queryRunner,
          index.foreignKeyColumn,
        );
        if (constraint) {
          await queryRunner.query(
            `CREATE INDEX \`${constraint}\` ON \`${TABLE}\` (\`${index.foreignKeyColumn}\`)`,
          );
        }
      }

      await queryRunner.query(`DROP INDEX \`${index.name}\` ON \`${TABLE}\``);
    }
  }

  private async indexExists(
    queryRunner: QueryRunner,
    name: string,
  ): Promise<boolean> {
    const rows: unknown[] = await queryRunner.query(
      'SELECT 1 FROM `information_schema`.`statistics` ' +
        'WHERE `table_schema` = DATABASE() AND `table_name` = ? ' +
        'AND `index_name` = ? LIMIT 1',
      [TABLE, name],
    );
    return rows.length > 0;
  }

  /** Is `column` the leading column of an index other than `excludedIndex`? */
  private async hasOtherLeadingIndex(
    queryRunner: QueryRunner,
    column: string,
    excludedIndex: string,
  ): Promise<boolean> {
    const rows: unknown[] = await queryRunner.query(
      'SELECT 1 FROM `information_schema`.`statistics` ' +
        'WHERE `table_schema` = DATABASE() AND `table_name` = ? ' +
        'AND `column_name` = ? AND `seq_in_index` = 1 ' +
        'AND `index_name` <> ? LIMIT 1',
      [TABLE, column, excludedIndex],
    );
    return rows.length > 0;
  }

  private async foreignKeyName(
    queryRunner: QueryRunner,
    column: string,
  ): Promise<string | undefined> {
    const rows: { CONSTRAINT_NAME: string }[] = await queryRunner.query(
      'SELECT `constraint_name` AS `CONSTRAINT_NAME` ' +
        'FROM `information_schema`.`key_column_usage` ' +
        'WHERE `table_schema` = DATABASE() AND `table_name` = ? ' +
        'AND `column_name` = ? AND `referenced_table_name` IS NOT NULL LIMIT 1',
      [TABLE, column],
    );
    return rows[0]?.CONSTRAINT_NAME;
  }
}
