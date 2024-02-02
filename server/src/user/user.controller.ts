import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.services';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { LogUserInDto } from './dto/LogUserInDto';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<{ users: UserEntity[] }> {
    return await this.userService.getAllUsers();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async logInUser(
    @Body('user') logUserInDto: LogUserInDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.logInUser(logUserInDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(@Req() request: ExpressRequestInterface): Promise<any> {
    console.log('current user', request.user);
    return this.userService.buildUserResponse(request.user);
  }
}
