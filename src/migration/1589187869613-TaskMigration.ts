import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class TaskMigration1589187869613 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'tasks',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
        },
        {
          name: 'userId',
          type: 'integer',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'color',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'position',
          type: 'integer',
          isNullable: true,
        },
        {
          name: 'isDone',
          type: 'boolean',
          default: false,
        }
      ]
    }), true);

    await queryRunner.createForeignKey('tasks', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('tasks');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('questionId') !== -1);
    await queryRunner.dropForeignKey('tasks', foreignKey);
    await queryRunner.dropTable('tasks');
  }

}
