import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

class MigrationUtil {
  public static getIDColumn(): TableColumnOptions[] {
    const columns: TableColumnOptions[] = [];
    columns.push({
      name: 'userId',
      type: 'int',
      isPrimary: true,
      isNullable: false,
      isGenerated: true,
      generationStrategy: 'increment',
    });

    return columns;
  }

  public static getVarCharColumn({
    name,
    length = '255',
    isPrimary = false,
    isNullable = false,
    isUnique = false,
    defaultValue = null,
  }): TableColumnOptions {
    return {
      name,
      length,
      isPrimary,
      isNullable,
      isUnique,
      default: `'${defaultValue}'`,
      type: 'varchar',
    };
  }

  public static getBoleanColumn({
    name,
    type = 'bool',
    isNullable = true,
    isUnique = false,
  }): TableColumnOptions {
    return {
      name,
      type,
      isUnique,
      isNullable,
    };
  }

  public static getUUidColumn({
    name,
    type = 'uuid',
    isNullable = true,
    isUnique = true,
  }): TableColumnOptions {
    return {
      name,
      type,
      isNullable,
      isUnique,
    };
  }
}

export default MigrationUtil;
