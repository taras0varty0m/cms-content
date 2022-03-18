import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1647414567178 implements MigrationInterface {
  name = "initial1647414567178";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "screen" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventId" uuid NOT NULL, "playlistId" character varying NOT NULL, CONSTRAINT "PK_7d30806a7556636b84d24e75f4d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "playlist_content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playlistId" uuid NOT NULL, "contentId" uuid NOT NULL, "duration" integer NOT NULL, "priority" integer NOT NULL, CONSTRAINT "PK_b92302a5c24f36383de1a5b96d1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "href" character varying NOT NULL, "fileKey" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "screen" ADD CONSTRAINT "FK_dda5d2273aa0068aa0eb8a22f7f" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist_content" ADD CONSTRAINT "FK_51b56d109200832ffe3b0d30cba" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist_content" ADD CONSTRAINT "FK_7800b81d78dc785e558ec31f1fe" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "content" ADD CONSTRAINT "FK_43185da5e33e99752c6edf91352" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "content" DROP CONSTRAINT "FK_43185da5e33e99752c6edf91352"`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist_content" DROP CONSTRAINT "FK_7800b81d78dc785e558ec31f1fe"`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist_content" DROP CONSTRAINT "FK_51b56d109200832ffe3b0d30cba"`
    );
    await queryRunner.query(
      `ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`
    );
    await queryRunner.query(
      `ALTER TABLE "screen" DROP CONSTRAINT "FK_dda5d2273aa0068aa0eb8a22f7f"`
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`
    );
    await queryRunner.query(`DROP TABLE "content"`);
    await queryRunner.query(`DROP TABLE "playlist_content"`);
    await queryRunner.query(`DROP TABLE "playlist"`);
    await queryRunner.query(`DROP TABLE "screen"`);
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
