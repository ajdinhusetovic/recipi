import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStepsEntity1708350848736 implements MigrationInterface {
    name = 'CreateStepsEntity1708350848736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "steps" ("id" SERIAL NOT NULL, "stepNumber" integer NOT NULL, "instruction" character varying NOT NULL, "recipeId" integer, CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "instructions"`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "instructions" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "steps"`);
    }

}
