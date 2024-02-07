import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { sign } from 'jsonwebtoken';
import { LogUserInDto } from './dto/LogUserInDto';
import { compare } from 'bcrypt';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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

    return await this.userRepository.save(newUser);
  }

  async deleteCurrentUser(currentUserId: number) {
    const user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.delete({ id: currentUserId });
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

  async updateUser(currentUserId: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOne({ where: { id: currentUserId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user = Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.find();

    const results = users.length;

    return { results, users };
  }
}
