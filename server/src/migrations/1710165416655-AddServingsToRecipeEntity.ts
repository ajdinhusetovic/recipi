import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServingsToRecipeEntity1710165416655 implements MigrationInterface {
    name = 'AddServingsToRecipeEntity1710165416655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "servings" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "servings"`);
    }

}
