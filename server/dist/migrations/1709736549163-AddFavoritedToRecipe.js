"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFavoritedToRecipe1709736549163 = void 0;
class AddFavoritedToRecipe1709736549163 {
    constructor() {
        this.name = 'AddFavoritedToRecipe1709736549163';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "favorited" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "favorited"`);
    }
}
exports.AddFavoritedToRecipe1709736549163 = AddFavoritedToRecipe1709736549163;
//# sourceMappingURL=1709736549163-AddFavoritedToRecipe.js.map