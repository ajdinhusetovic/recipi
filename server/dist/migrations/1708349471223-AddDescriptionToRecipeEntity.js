"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDescriptionToRecipeEntity1708349471223 = void 0;
class AddDescriptionToRecipeEntity1708349471223 {
    constructor() {
        this.name = 'AddDescriptionToRecipeEntity1708349471223';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" ADD "description" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "description"`);
    }
}
exports.AddDescriptionToRecipeEntity1708349471223 = AddDescriptionToRecipeEntity1708349471223;
//# sourceMappingURL=1708349471223-AddDescriptionToRecipeEntity.js.map