import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const newUser = new UserEntity();

    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    const configService = new ConfigService();
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      configService.get<string>('JWTSECRET'),
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
}
