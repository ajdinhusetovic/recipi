"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRecipeEntity1707396271243 = void 0;
class CreateRecipeEntity1707396271243 {
    constructor() {
        this.name = 'CreateRecipeEntity1707396271243';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "tags" text NOT NULL, "instructions" character varying NOT NULL, "videoLink" character varying NOT NULL, "recipeArea" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "recipes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateRecipeEntity1707396271243 = CreateRecipeEntity1707396271243;
//# sourceMappingURL=1707396271243-CreateRecipeEntity.js.map