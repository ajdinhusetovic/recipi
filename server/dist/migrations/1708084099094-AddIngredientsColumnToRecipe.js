"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIngredientsColumnToRecipe1708084099094 = void 0;
class AddIngredientsColumnToRecipe1708084099094 {
    constructor() {
        this.name = 'AddIngredientsColumnToRecipe1708084099094';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "ingredients" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "ingredients"`);
    }
}
exports.AddIngredientsColumnToRecipe1708084099094 = AddIngredientsColumnToRecipe1708084099094;
//# sourceMappingURL=1708084099094-AddIngredientsColumnToRecipe.js.map