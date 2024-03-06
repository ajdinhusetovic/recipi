import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtAndUpdatedAtForRecipe1709739750832 implements MigrationInterface {
    name = 'AddCreatedAtAndUpdatedAtForRecipe1709739750832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "createdAt"`);
    }

}
