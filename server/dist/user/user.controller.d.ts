/// <reference types="multer" />
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.services';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { LogUserInDto } from './dto/LogUserInDto';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { UpdateUserDto } from './dto/UpdateUserDto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<{
        users: UserEntity[];
    }>;
    getCurrentUser(currentUserId: number): Promise<UserEntity>;
    getUserByUsername(username: string): Promise<UserEntity>;
    createUser(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<UserEntity>;
    deleteCurrentUser(currentUserId: number): Promise<import("typeorm").DeleteResult>;
    updateUser(currentUserId: number, updateUserDto: UpdateUserDto, file: Express.Multer.File): Promise<UserResponseInterface>;
    logInUser(logUserInDto: LogUserInDto): Promise<UserResponseInterface>;
    currentUser(request: ExpressRequestInterface, userId: number): Promise<any>;
}
