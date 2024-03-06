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
const step_entity_1 = require("../step/step.entity");
let RecipeService = class RecipeService {
    constructor(recipeRepository, userRepository, stepRepository, dataSource) {
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
        this.stepRepository = stepRepository;
        this.dataSource = dataSource;
        this.s3Client = new client_s3_1.S3Client({ region: process.env.AWS_S3_REGION });
    }
    async getAllRecipes() {
        const recipes = await this.recipeRepository.find({ relations: ['user', 'steps'] });
        const recipeCount = recipes.length;
        return { results: recipeCount, recipes };
    }
    async getRecipe(slug) {
        const recipe = await this.recipeRepository.findOne({
            where: { slug },
            relations: ['steps', 'similarRecipes'],
        });
        if (!recipe) {
            throw new common_1.HttpException('Recipe does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const allRecipes = await this.recipeRepository.find({ relations: ['steps'], where: { id: (0, typeorm_2.Not)(recipe.id) } });
        const similarRecipes = allRecipes.filter((similarRecipe) => recipe.name.split(' ').some((recipeName) => similarRecipe.name.includes(recipeName)));
        recipe.similarRecipes = similarRecipes;
        return recipe;
    }
    async createRecipe(currentUserId, createRecipeDto, fileName, file) {
        const user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const newRecipe = { ...createRecipeDto };
        let recipe;
        if (file && fileName) {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({ Bucket: 'recipiebucket', Key: fileName, Body: file }));
            recipe = this.recipeRepository.create({
                ...newRecipe,
                user,
                image: `https://recipiebucket.s3.amazonaws.com/${fileName}`,
                steps: [],
            });
        }
        else {
            recipe = this.recipeRepository.create({
                ...newRecipe,
                user,
                steps: [],
            });
        }
        recipe.slug = (0, slugify_1.default)(recipe.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        const savedRecipe = await this.recipeRepository.save(recipe);
        if (createRecipeDto.steps && createRecipeDto.steps.length > 0) {
            const steps = createRecipeDto.steps.map((stepInstruction, index) => this.stepRepository.create({
                instruction: stepInstruction,
                stepNumber: index + 1,
                recipe: savedRecipe,
            }));
            await this.stepRepository.save(steps);
            savedRecipe.steps = steps;
        }
        return savedRecipe;
    }
    async deleteRecipe(currentUserId, slug) {
        const recipe = await this.recipeRepository.findOne({ where: { slug } });
        if (!recipe) {
            throw new common_1.HttpException('Recipe not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (recipe.user.id !== currentUserId) {
            throw new common_1.HttpException('You are not the owner of this recipe', common_1.HttpStatus.FORBIDDEN);
        }
        await this.stepRepository.delete({ recipe: recipe });
        if (recipe.image) {
            const url = recipe.image;
            const urlParts = url.split('/');
            const objectKey = urlParts.slice(3).join('/');
            console.log(objectKey);
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: 'recipiebucket', Key: objectKey }));
        }
        return await this.recipeRepository.delete({ slug });
    }
    async updateRecipe(currentUserId, slug, updateRecipeDto, fileName, file) {
        const user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('User does not exist', common_1.HttpStatus.NOT_FOUND);
        }
        const existingRecipe = await this.recipeRepository.findOne({
            where: { slug: slug, user: { id: currentUserId } },
            relations: ['steps'],
        });
        if (!existingRecipe) {
            throw new common_1.HttpException('Recipe not found', common_1.HttpStatus.NOT_FOUND);
        }
        Object.assign(existingRecipe, updateRecipeDto);
        if (file && fileName) {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({ Bucket: 'recipiebucket', Key: fileName, Body: file }));
            existingRecipe.image = `https://recipiebucket.s3.amazonaws.com/${fileName}`;
        }
        const updatedSteps = updateRecipeDto.steps.map((stepInstruction, index) => this.stepRepository.create({
            instruction: stepInstruction,
            stepNumber: index + 1,
            recipe: existingRecipe,
        }));
        const savedSteps = await this.stepRepository.save(updatedSteps);
        existingRecipe.steps = savedSteps;
        if (updateRecipeDto.name) {
            existingRecipe.slug =
                (0, slugify_1.default)(updateRecipeDto.name, { lower: true }) + '-' + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
        }
        const updatedRecipe = await this.recipeRepository.save(existingRecipe);
        return updatedRecipe;
    }
    async addRecipeToFavorites(slug, currentUserId) {
        const recipe = await this.recipeRepository.findOne({ where: { slug } });
        const user = await this.userRepository.findOne({ where: { id: currentUserId }, relations: ['favorites'] });
        const isNotFavorited = user.favorites.findIndex((recipeInFavorites) => recipeInFavorites.id === recipe.id) === -1;
        if (isNotFavorited) {
            user.favorites.push(recipe);
            recipe.favoritesCount++;
            recipe.favorited = true;
            await this.userRepository.save(user);
            await this.recipeRepository.save(recipe);
        }
        return recipe;
    }
    async removeRecipeFromFavorites(slug, currentUserId) {
        const recipe = await this.recipeRepository.findOne({ where: { slug } });
        const user = await this.userRepository.findOne({ where: { id: currentUserId }, relations: ['favorites'] });
        const recipeIndex = user.favorites.findIndex((recipeInFavorites) => recipeInFavorites.id === recipe.id);
        if (recipeIndex >= 0) {
            user.favorites.splice(recipeIndex, 1);
            recipe.favoritesCount--;
            recipe.favorited = false;
            await this.userRepository.save(user);
            await this.recipeRepository.save(recipe);
        }
        return recipe;
    }
    async searchRecipesAndUsers(query) {
        console.log('Search');
        const tagResults = await this.recipeRepository.find({
            where: {
                tags: (0, typeorm_2.ILike)(`%${query}%`),
            },
        });
        const recipeResults = await this.recipeRepository.find({
            where: {
                name: (0, typeorm_2.ILike)(`%${query}%`),
            },
        });
        return {
            tags: tagResults,
            recipes: recipeResults,
        };
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(step_entity_1.StepEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map