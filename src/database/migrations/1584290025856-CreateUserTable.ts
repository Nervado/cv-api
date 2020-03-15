import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import MigrationUtil from '../../util/migrationUtil';

export class CreateUserTable1584290025856 implements MigrationInterface {
  private static readonly table = new Table({
    name: 'UserTable',
    columns: [
      ...MigrationUtil.getIDColumn(),
      MigrationUtil.getVarCharColumn({ name: 'name' }),
      MigrationUtil.getVarCharColumn({ name: 'email' }),
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(CreateUserTable1584290025856.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(CreateUserTable1584290025856.table);
  }
}
