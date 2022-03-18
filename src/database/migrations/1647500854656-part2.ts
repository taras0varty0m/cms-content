import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from "typeorm";

export class part21647500854656 implements MigrationInterface {
  name = "part21647500854656";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("user", ["password"]);

    await queryRunner.createTable(
      new Table({
        name: "content_groups",
        columns: [
          {
            name: "id",
            isPrimary: true,
            isGenerated: true,
            type: "uuid",
          },
          {
            name: "title",
            type: "varchar(32)",
            isNullable: true,
          },
          {
            name: "type",
            type: "varchar(32)",
            default: "'default'",
          },
          {
            name: "userId",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "content_groups",
            columnNames: ["userId"],
            referencedTableName: "user",
            referencedColumnNames: ["id"],
          },
        ],
      }),
      true,
      true
    );

    await queryRunner.query(
      'INSERT INTO "content_groups" (id, "userId")  SELECT id, "userId" FROM "content";'
    );

    await queryRunner.addColumns("content", [
      new TableColumn({
        name: "groupId",
        type: "uuid",
        isNullable: true,
      }),
    ]);
    await queryRunner.query('UPDATE content SET "groupId" = id;');
    await queryRunner.changeColumn(
      "content",
      "groupId",
      new TableColumn({
        name: "groupId",
        type: "uuid",
        isNullable: false,
      })
    );
    await queryRunner.createForeignKey(
      "content",
      new TableForeignKey({
        name: "content",
        columnNames: ["groupId"],
        referencedTableName: "content_groups",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropColumns("content", ["userId"]);
    await queryRunner.addColumn(
      "playlist_content",
      new TableColumn({
        name: "groupId",
        type: "uuid",
        isNullable: true,
      })
    );
    await queryRunner.query(
      'UPDATE playlist_content SET "groupId" = "contentId"'
    );
    await queryRunner.dropColumn("playlist_content", "contentId");
    await queryRunner.createForeignKey(
      "playlist_content",
      new TableForeignKey({
        name: "playlist_content",
        columnNames: ["groupId"],
        referencedTableName: "content_groups",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.dropColumn("content", "href");

    await queryRunner.createUniqueConstraint(
      "content",
      new TableUnique({
        columnNames: ["groupId"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      "Not implemented. There is no way to revert migration without loosing data"
    );
  }
}
