import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDifficultyToRecipe1708706918980 implements MigrationInterface {
    name = 'AddDifficultyToRecipe1708706918980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "difficulty" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "difficulty"`);
    }

}
