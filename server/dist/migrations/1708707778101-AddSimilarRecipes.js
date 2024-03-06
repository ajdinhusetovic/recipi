"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSimilarRecipes1708707778101 = void 0;
class AddSimilarRecipes1708707778101 {
    constructor() {
        this.name = 'AddSimilarRecipes1708707778101';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "recipes_similar_recipes_recipes" ("recipesId_1" integer NOT NULL, "recipesId_2" integer NOT NULL, CONSTRAINT "PK_3d9caefcdf0e36b45a0ab01cc48" PRIMARY KEY ("recipesId_1", "recipesId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7c1dbbdb3f34c91ebf8ec0fd54" ON "recipes_similar_recipes_recipes" ("recipesId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_38a45ffc18de551a6a09ded33c" ON "recipes_similar_recipes_recipes" ("recipesId_2") `);
        await queryRunner.query(`ALTER TABLE "recipes_similar_recipes_recipes" ADD CONSTRAINT "FK_7c1dbbdb3f34c91ebf8ec0fd545" FOREIGN KEY ("recipesId_1") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipes_similar_recipes_recipes" ADD CONSTRAINT "FK_38a45ffc18de551a6a09ded33cf" FOREIGN KEY ("recipesId_2") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes_similar_recipes_recipes" DROP CONSTRAINT "FK_38a45ffc18de551a6a09ded33cf"`);
        await queryRunner.query(`ALTER TABLE "recipes_similar_recipes_recipes" DROP CONSTRAINT "FK_7c1dbbdb3f34c91ebf8ec0fd545"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_38a45ffc18de551a6a09ded33c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7c1dbbdb3f34c91ebf8ec0fd54"`);
        await queryRunner.query(`DROP TABLE "recipes_similar_recipes_recipes"`);
    }
}
exports.AddSimilarRecipes1708707778101 = AddSimilarRecipes1708707778101;
//# sourceMappingURL=1708707778101-AddSimilarRecipes.js.map