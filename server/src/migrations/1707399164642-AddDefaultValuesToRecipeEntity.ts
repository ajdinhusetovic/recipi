import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultValuesToRecipeEntity1707399164642 implements MigrationInterface {
  name = 'AddDefaultValuesToRecipeEntity1707399164642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "videoLink" SET DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "recipeArea" SET DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" SET DEFAULT ''`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "recipeArea" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "videoLink" DROP DEFAULT`);
  }
}
