import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndFontEntityCreated1686578042149
  implements MigrationInterface
{
  name = "UserAndFontEntityCreated1686578042149";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "font" ("id" SERIAL NOT NULL, "filePath" character varying NOT NULL, "name" character varying(64) NOT NULL, CONSTRAINT "PK_3467693ce075493cfbab9f6f8be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying(64) NOT NULL, "password" character varying(64) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "font"`);
  }
}
