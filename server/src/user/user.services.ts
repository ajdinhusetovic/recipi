import 'dotenv/config';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { sign } from 'jsonwebtoken';
import { LogUserInDto } from './dto/LogUserInDto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { RecipeEntity } from 'src/recipe/recipe.entity';
import { StepEntity } from 'src/step/step.entity';

@Injectable()
export class UserService {
  private readonly s3Client = new S3Client({ region: process.env.AWS_S3_REGION });
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RecipeEntity) private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(StepEntity) private readonly stepRepository: Repository<StepEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto, fileName?: string, file?: Buffer): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (userByEmail) {
      throw new HttpException('Account with that email already exists', HttpStatus.CONFLICT);
    }

    if (userByUsername) {
      throw new HttpException('Account with that username already exists', HttpStatus.CONFLICT);
    }

    if (createUserDto.password.length < 8) {
      throw new HttpException('Password too short', HttpStatus.BAD_REQUEST);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    if (file && fileName) {
      await this.s3Client.send(new PutObjectCommand({ Bucket: 'recipieusers', Key: fileName, Body: file }));
      newUser.image = `https://recipieusers.s3.amazonaws.com/${fileName}`;
    }

    return await this.userRepository.save(newUser);
  }

  async deleteCurrentUser(currentUserId: number) {
    // Find the user
    const user = await this.userRepository.findOne({
      where: { id: currentUserId },
      relations: ['recipes', 'favorites'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Delete related recipes and steps
    await Promise.all(
      user.recipes.map(async (recipe) => {
        // Delete related steps
        await this.stepRepository.delete({ id: recipe.id });
        // Delete the recipe itself
        await this.recipeRepository.delete(recipe.id);
      }),
    );

    // Delete related favorites
    await Promise.all(
      user.favorites.map(async (favorite) => {
        await this.recipeRepository.createQueryBuilder().relation(UserEntity, 'favorites').of(user).remove(favorite);
      }),
    );

    // Finally, delete the user
    await this.userRepository.delete({ id: currentUserId });

    return 'User deleted successfully';
  }

  async logInUser(logUserInDto: LogUserInDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { username: logUserInDto.username },
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await compare(logUserInDto.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    return user;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWTSECRET,
      { expiresIn: '24h' },
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(currentUserId: number, updateUserDto: UpdateUserDto, fileName?: string, file?: Buffer) {
    let user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.email === updateUserDto.email || user.username === updateUserDto.username) {
      throw new HttpException('Username taken', HttpStatus.CONFLICT);
    }

    user = Object.assign(user, updateUserDto);

    if (file && fileName) {
      await this.s3Client.send(new PutObjectCommand({ Bucket: 'recipieusers', Key: fileName, Body: file }));
      user.image = `https://recipieusers.s3.amazonaws.com/${fileName}`;
    }

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    const results = users.length;

    return { results, users };
  }

  async getCurrentUser(currentUserId: number) {
    const user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['recipes', 'favorites'] });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
