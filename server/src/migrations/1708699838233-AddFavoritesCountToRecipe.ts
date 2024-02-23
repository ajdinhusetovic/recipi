import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesCountToRecipe1708699838233 implements MigrationInterface {
    name = 'AddFavoritesCountToRecipe1708699838233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "favoritesCount"`);
    }

}
