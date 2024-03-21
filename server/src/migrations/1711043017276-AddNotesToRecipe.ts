import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotesToRecipe1711043017276 implements MigrationInterface {
    name = 'AddNotesToRecipe1711043017276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "notes" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "notes"`);
    }

}
