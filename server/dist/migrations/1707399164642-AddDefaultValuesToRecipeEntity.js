"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDefaultValuesToRecipeEntity1707399164642 = void 0;
class AddDefaultValuesToRecipeEntity1707399164642 {
    constructor() {
        this.name = 'AddDefaultValuesToRecipeEntity1707399164642';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "videoLink" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "recipeArea" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" SET DEFAULT ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "image" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "recipeArea" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "recipes" ALTER COLUMN "videoLink" DROP DEFAULT`);
    }
}
exports.AddDefaultValuesToRecipeEntity1707399164642 = AddDefaultValuesToRecipeEntity1707399164642;
//# sourceMappingURL=1707399164642-AddDefaultValuesToRecipeEntity.js.map