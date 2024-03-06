"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDifficultyToRecipe1708706918980 = void 0;
class AddDifficultyToRecipe1708706918980 {
    constructor() {
        this.name = 'AddDifficultyToRecipe1708706918980';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "difficulty" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "difficulty"`);
    }
}
exports.AddDifficultyToRecipe1708706918980 = AddDifficultyToRecipe1708706918980;
//# sourceMappingURL=1708706918980-AddDifficultyToRecipe.js.map