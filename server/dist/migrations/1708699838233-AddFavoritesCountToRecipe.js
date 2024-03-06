"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFavoritesCountToRecipe1708699838233 = void 0;
class AddFavoritesCountToRecipe1708699838233 {
    constructor() {
        this.name = 'AddFavoritesCountToRecipe1708699838233';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "favoritesCount"`);
    }
}
exports.AddFavoritesCountToRecipe1708699838233 = AddFavoritesCountToRecipe1708699838233;
//# sourceMappingURL=1708699838233-AddFavoritesCountToRecipe.js.map