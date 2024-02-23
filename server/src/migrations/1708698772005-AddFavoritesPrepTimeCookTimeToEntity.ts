import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavoritesPrepTimeCookTimeToEntity1708698772005 implements MigrationInterface {
    name = 'AddFavoritesPrepTimeCookTimeToEntity1708698772005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorites_recipes" ("usersId" integer NOT NULL, "recipesId" integer NOT NULL, CONSTRAINT "PK_5e61ef6ed50f3f755fc12747e37" PRIMARY KEY ("usersId", "recipesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d53f63d324fc0711403407473" ON "users_favorites_recipes" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c99760a9286ba1f55c12c15ef" ON "users_favorites_recipes" ("recipesId") `);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "recipeArea"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "prepTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "cookTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_favorites_recipes" ADD CONSTRAINT "FK_7d53f63d324fc07114034074737" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_recipes" ADD CONSTRAINT "FK_3c99760a9286ba1f55c12c15efb" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_recipes" DROP CONSTRAINT "FK_3c99760a9286ba1f55c12c15efb"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_recipes" DROP CONSTRAINT "FK_7d53f63d324fc07114034074737"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "cookTime"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "prepTime"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "recipeArea" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c99760a9286ba1f55c12c15ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d53f63d324fc0711403407473"`);
        await queryRunner.query(`DROP TABLE "users_favorites_recipes"`);
    }

}
