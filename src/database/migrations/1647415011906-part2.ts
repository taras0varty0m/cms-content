import { MigrationInterface, QueryRunner } from "typeorm";

export class part21647415011906 implements MigrationInterface {
  name = "part21647415011906";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "href"`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "groupId" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE TABLE "content_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b459ae1ffef2a947ebe7f06f0bf" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "groupId"`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "groupId" uuid NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_b41b839c1ad37c88100711f4441" FOREIGN KEY ("groupId") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "content_group" ADD CONSTRAINT "FK_098035d32a04f45d75005bb9cf2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content_group" DROP CONSTRAINT "FK_098035d32a04f45d75005bb9cf2"`
    );
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_b41b839c1ad37c88100711f4441"`
    );
    await queryRunner.query(`ALTER TABLE "content" DROP COLUMN "groupId"`);
    await queryRunner.query(
      `ALTER TABLE "content" ADD "groupId" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "content_group"`);
    await queryRunner.query(
      `ALTER TABLE "content" RENAME COLUMN "groupId" TO "href"`
    );
  }
}
