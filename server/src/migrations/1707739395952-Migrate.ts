import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1707739395952 implements MigrationInterface {
    name = 'Migrate1707739395952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "tags" text NOT NULL, "instructions" character varying NOT NULL, "videoLink" character varying NOT NULL DEFAULT '', "recipeArea" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "userId" integer, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "recipes"`);
    }

}
