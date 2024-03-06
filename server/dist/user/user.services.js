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
exports.UserService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
const client_s3_1 = require("@aws-sdk/client-s3");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.s3Client = new client_s3_1.S3Client({ region: process.env.AWS_S3_REGION });
    }
    async createUser(createUserDto, fileName, file) {
        const userByEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        const userByUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });
        if (userByEmail) {
            throw new common_1.HttpException('Account with that email already exists', common_1.HttpStatus.CONFLICT);
        }
        if (userByUsername) {
            throw new common_1.HttpException('Account with that username already exists', common_1.HttpStatus.CONFLICT);
        }
        if (createUserDto.password.length < 8) {
            throw new common_1.HttpException('Password too short', common_1.HttpStatus.BAD_REQUEST);
        }
        const newUser = new user_entity_1.UserEntity();
        Object.assign(newUser, createUserDto);
        if (file && fileName) {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({ Bucket: 'recipieusers', Key: fileName, Body: file }));
            newUser.image = `https://recipieusers.s3.amazonaws.com/${fileName}`;
        }
        return await this.userRepository.save(newUser);
    }
    async deleteCurrentUser(currentUserId) {
        const user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('Error', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.delete({ id: currentUserId });
    }
    async logInUser(logUserInDto) {
        const user = await this.userRepository.findOne({
            where: { username: logUserInDto.username },
            select: ['id', 'username', 'email', 'bio', 'image', 'password'],
        });
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(logUserInDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        delete user.password;
        return user;
    }
    generateJwt(user) {
        return (0, jsonwebtoken_1.sign)({
            id: user.id,
            username: user.username,
            email: user.email,
        }, process.env.JWTSECRET, { expiresIn: '24h' });
    }
    buildUserResponse(user) {
        return {
            user: {
                ...user,
                token: this.generateJwt(user),
            },
        };
    }
    async getUserById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async updateUser(currentUserId, updateUserDto, fileName, file) {
        let user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (user.email === updateUserDto.email || user.username === updateUserDto.username) {
            throw new common_1.HttpException('Username taken', common_1.HttpStatus.CONFLICT);
        }
        user = Object.assign(user, updateUserDto);
        if (file && fileName) {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({ Bucket: 'recipieusers', Key: fileName, Body: file }));
            user.image = `https://recipieusers.s3.amazonaws.com/${fileName}`;
        }
        return await this.userRepository.save(user);
    }
    async getAllUsers() {
        const users = await this.userRepository.find();
        const results = users.length;
        return { results, users };
    }
    async getCurrentUser(currentUserId) {
        const user = await this.userRepository.findOne({ where: { id: currentUserId } });
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async getUserByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username }, relations: ['recipes', 'favorites'] });
        if (!user) {
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.services.js.map