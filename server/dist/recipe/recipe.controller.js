"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const CreateRecipeDto_1 = require("./dto/CreateRecipeDto");
const auth_guard_1 = require("../user/guards/auth.guard");
const recipe_service_1 = require("./recipe.service");
const user_decorator_1 = require("../user/decorators/user.decorator");
const UpdateRecipeDto_1 = require("./dto/UpdateRecipeDto");
const platform_express_1 = require("@nestjs/platform-express");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    async getAllRecipes() {
        return this.recipeService.getAllRecipes();
    }
    async createRecipe(currentUserId, createRecipeDto, file) {
        return await this.recipeService.createRecipe(currentUserId, createRecipeDto, file.originalname, file.buffer);
    }
    async deleteRecipe(currentUserId, slug) {
        return this.recipeService.deleteRecipe(currentUserId, slug);
    }
    async updateRecipe(currentUserId, updateRecipeDto, slug) {
        return await this.recipeService.updateRecipe(currentUserId, slug, updateRecipeDto);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getAllRecipes", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ validators: [new common_1.FileTypeValidator({ fileType: 'image/jpeg' })] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateRecipeDto_1.CreateRecipeDto, Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "createRecipe", null);
__decorate([
    (0, common_1.Delete)(':slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "deleteRecipe", null);
__decorate([
    (0, common_1.Put)(':slug'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)('recipe')),
    __param(2, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateRecipeDto_1.UpdateRecipeDto, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateRecipe", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map