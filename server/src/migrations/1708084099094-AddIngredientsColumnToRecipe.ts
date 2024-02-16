import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIngredientsColumnToRecipe1708084099094 implements MigrationInterface {
    name = 'AddIngredientsColumnToRecipe1708084099094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "ingredients" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "ingredients"`);
    }

}
