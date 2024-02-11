"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSlugsToRecipe1707487603543 = void 0;
class AddSlugsToRecipe1707487603543 {
    constructor() {
        this.name = 'AddSlugsToRecipe1707487603543';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "slug" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "slug"`);
    }
}
exports.AddSlugsToRecipe1707487603543 = AddSlugsToRecipe1707487603543;
//# sourceMappingURL=1707487603543-AddSlugsToRecipe.js.map