import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugsToRecipe1707487603543 implements MigrationInterface {
    name = 'AddSlugsToRecipe1707487603543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "slug"`);
    }

}
