"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCreatedAtAndUpdatedAtForRecipe1709739750832 = void 0;
class AddCreatedAtAndUpdatedAtForRecipe1709739750832 {
    constructor() {
        this.name = 'AddCreatedAtAndUpdatedAtForRecipe1709739750832';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "recipes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "createdAt"`);
    }
}
exports.AddCreatedAtAndUpdatedAtForRecipe1709739750832 = AddCreatedAtAndUpdatedAtForRecipe1709739750832;
//# sourceMappingURL=1709739750832-AddCreatedAtAndUpdatedAtForRecipe.js.map