import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRelationBetweenUserAndRecipe1707401146255 implements MigrationInterface {
    name = 'CreateRelationBetweenUserAndRecipe1707401146255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`);
    }

}
