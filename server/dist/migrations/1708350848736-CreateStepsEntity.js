"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStepsEntity1708350848736 = void 0;
class CreateStepsEntity1708350848736 {
    constructor() {
        this.name = 'CreateStepsEntity1708350848736';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "steps" ("id" SERIAL NOT NULL, "stepNumber" integer NOT NULL, "instruction" character varying NOT NULL, "recipeId" integer, CONSTRAINT "PK_65f86ac8996204d11f915f66a5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "instructions"`);
        await queryRunner.query(`ALTER TABLE "steps" ADD CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "steps" DROP CONSTRAINT "FK_33afb29ffd643b8d79f88cf1954"`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "instructions" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "steps"`);
    }
}
exports.CreateStepsEntity1708350848736 = CreateStepsEntity1708350848736;
//# sourceMappingURL=1708350848736-CreateStepsEntity.js.map