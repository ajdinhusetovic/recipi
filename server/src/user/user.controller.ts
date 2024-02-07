import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.services';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { LogUserInDto } from './dto/LogUserInDto';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/auth.guard';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<{ users: UserEntity[] }> {
    return await this.userService.getAllUsers();
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @Delete('user')
  @UseGuards(AuthGuard)
  async deleteCurrentUser(@User('id') currentUserId: number) {
    return await this.userService.deleteCurrentUser(currentUserId);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateUser(@User('id') currentUserId: number, @Body('user') updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(currentUserId, updateUserDto);
    return await this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async logInUser(@Body('user') logUserInDto: LogUserInDto): Promise<UserResponseInterface> {
    const user = await this.userService.logInUser(logUserInDto);

    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@Req() request: ExpressRequestInterface, @User('id') userId: number): Promise<any> {
    console.log('current user', userId);
    return this.userService.buildUserResponse(request.user);
  }
}
