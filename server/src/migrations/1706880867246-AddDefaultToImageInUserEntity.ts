import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultToImageInUserEntity1706880867246 implements MigrationInterface {
    name = 'AddDefaultToImageInUserEntity1706880867246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "image" DROP DEFAULT`);
    }

}
