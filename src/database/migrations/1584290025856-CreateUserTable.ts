import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import MigrationUtil from '../../util/migrationUtil';

export class CreateUserTable1584290025856 implements MigrationInterface {
  private static readonly table = new Table({
    name: 'UserTable',
    columns: [
      ...MigrationUtil.getIDColumn(),
      MigrationUtil.getVarCharColumn({ name: 'username' }),
      MigrationUtil.getVarCharColumn({ name: 'surname' }),
      MigrationUtil.getVarCharColumn({ name: 'email', isUnique: true }),
      MigrationUtil.getVarCharColumn({ name: 'cpf' }),
      MigrationUtil.getVarCharColumn({ name: 'phonenumber' }),
      MigrationUtil.getVarCharColumn({ name: 'street' }),
      MigrationUtil.getVarCharColumn({ name: 'housenumber' }),
      MigrationUtil.getVarCharColumn({ name: 'complement' }),
      MigrationUtil.getVarCharColumn({ name: 'neibehoord' }),
      MigrationUtil.getVarCharColumn({ name: 'city' }),
      MigrationUtil.getVarCharColumn({ name: 'uf' }),
      MigrationUtil.getVarCharColumn({ name: 'cep' }),
      MigrationUtil.getVarCharColumn({ name: 'password' }),
      MigrationUtil.getVarCharColumn({ name: 'salt' }),
      { name: 'admin', type: 'bool', isNullable: true },
      { name: 'ispro', type: 'bool', isNullable: true },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(CreateUserTable1584290025856.table);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(CreateUserTable1584290025856.table);
  }
}
