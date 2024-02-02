import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagePropertyToUserEntity1706880038084 implements MigrationInterface {
    name = 'AddImagePropertyToUserEntity1706880038084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "image"`);
    }

}
