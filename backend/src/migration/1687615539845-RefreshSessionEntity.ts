import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshSessionEntity1687615539845 implements MigrationInterface {
  name = "RefreshSessionEntity1687615539845";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_session" ("id" SERIAL NOT NULL, "refreshToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer, CONSTRAINT "PK_6c067c97cd9afe8ff4d060c5f80" PRIMARY KEY ("id", "refreshToken"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_session" ADD CONSTRAINT "FK_3ae1d1221dbc787b1633dad301f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_session" DROP CONSTRAINT "FK_3ae1d1221dbc787b1633dad301f"`,
    );
    await queryRunner.query(`DROP TABLE "refresh_session"`);
  }
}
