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
exports.RecipeService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recipe_entity_1 = require("./recipe.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const client_s3_1 = require("@aws-sdk/client-s3");
const slugify_1 = require("slugify");
let RecipeService = class RecipeService {
    constructor(recipeRepository, userRepository) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.s3Client = new client_s3_1.S3Client({ region: process.env.AWS_S3_REGION });
    }
    async getAllRecipes() {
        const recipes = await this.recipeRepository.find({ relations: ['user'] });
        const recipeCount = recipes.length;
        return { results: recipeCount, recipes };
    }
    async createRecipe(currentUserId, createRecipeDto, fileName, file) {
        const user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const newRecipe = { ...createRecipeDto };
        await this.s3Client.send(new client_s3_1.PutObjectCommand({ Bucket: 'recipiebucket', Key: fileName, Body: file }));
        const recipe = this.recipeRepository.create({
            ...newRecipe,
            user,
            image: `https://recipiebucket.s3.amazonaws.com/${fileName}`,
        });
        recipe.slug = (0, slugify_1.default)(recipe.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        return await this.recipeRepository.save(recipe);
    }
    async deleteRecipe(currentUserId, slug) {
        const recipe = await this.recipeRepository.findOne({ where: { slug } });
        if (!recipe) {
            throw new common_1.HttpException('Recipe not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (recipe.user.id !== currentUserId) {
            throw new common_1.HttpException('You are not the owner of this recipe', common_1.HttpStatus.FORBIDDEN);
        }
        const url = recipe.image;
        const urlParts = url.split('/');
        const objectKey = urlParts.slice(3).join('/');
        console.log(objectKey);
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: 'recipiebucket', Key: objectKey }));
        return await this.recipeRepository.delete({ slug });
    }
    async updateRecipe(currentUserId, slug, updateRecipeDto) {
        const recipe = await this.recipeRepository.findOne({ where: { slug } });
        if (!recipe) {
            throw new common_1.HttpException('No recipe found', common_1.HttpStatus.NOT_FOUND);
        }
        if (recipe.user.id !== currentUserId) {
            throw new common_1.HttpException('You are not the recipe owner', common_1.HttpStatus.FORBIDDEN);
        }
        Object.assign(recipe, updateRecipeDto);
        recipe.slug = (0, slugify_1.default)(recipe.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        return await this.recipeRepository.save(recipe);
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map