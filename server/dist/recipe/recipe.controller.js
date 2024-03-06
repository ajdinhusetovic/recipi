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
        return await this.recipeService.getAllRecipes();
    }
    async searchRecipesAndUsers(query) {
        return await this.recipeService.searchRecipesAndUsers(query);
    }
    async getRecipe(slug) {
        return await this.recipeService.getRecipe(slug);
    }
    async createRecipe(currentUserId, createRecipeDto, file) {
        if (file) {
            return await this.recipeService.createRecipe(currentUserId, createRecipeDto, file.originalname, file.buffer);
        }
        return await this.recipeService.createRecipe(currentUserId, createRecipeDto);
    }
    async deleteRecipe(currentUserId, slug) {
        return this.recipeService.deleteRecipe(currentUserId, slug);
    }
    async updateRecipe(currentUserId, slug, updateRecipeDto, file) {
        if (file) {
            return await this.recipeService.updateRecipe(currentUserId, slug, updateRecipeDto, file.originalname, file.buffer);
        }
        return await this.recipeService.updateRecipe(currentUserId, slug, updateRecipeDto);
    }
    async addRecipeToFavorites(currentUserId, slug) {
        return await this.recipeService.addRecipeToFavorites(slug, currentUserId);
    }
    async removeRecipeFromFavorites(currentUserId, slug) {
        return await this.recipeService.removeRecipeFromFavorites(slug, currentUserId);
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
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "searchRecipesAndUsers", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getRecipe", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ validators: [new common_1.FileTypeValidator({ fileType: 'image/jpeg' })], fileIsRequired: false }))),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ validators: [new common_1.FileTypeValidator({ fileType: 'image/jpeg' })], fileIsRequired: false }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, UpdateRecipeDto_1.UpdateRecipeDto, Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateRecipe", null);
__decorate([
    (0, common_1.Post)(':slug/favorite'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addRecipeToFavorites", null);
__decorate([
    (0, common_1.Delete)(':slug/favorite'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeRecipeFromFavorites", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map