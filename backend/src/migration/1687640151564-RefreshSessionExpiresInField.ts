import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshSessionExpiresInField1687640151564
  implements MigrationInterface
{
  name = "RefreshSessionExpiresInField1687640151564";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_session" ADD "expiresIn" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_session" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_session" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_session" DROP COLUMN "expiresIn"`,
    );
  }
}
