"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationBetweenUserAndRecipe1707401146255 = void 0;
class CreateRelationBetweenUserAndRecipe1707401146255 {
    constructor() {
        this.name = 'CreateRelationBetweenUserAndRecipe1707401146255';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ad4f881e4b9769d16c0ed2bb3f0"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "userId"`);
    }
}
exports.CreateRelationBetweenUserAndRecipe1707401146255 = CreateRelationBetweenUserAndRecipe1707401146255;
//# sourceMappingURL=1707401146255-CreateRelationBetweenUserAndRecipe.js.map