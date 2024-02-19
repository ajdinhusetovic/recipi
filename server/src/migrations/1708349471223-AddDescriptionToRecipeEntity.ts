import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToRecipeEntity1708349471223 implements MigrationInterface {
    name = 'AddDescriptionToRecipeEntity1708349471223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "description"`);
    }

}
