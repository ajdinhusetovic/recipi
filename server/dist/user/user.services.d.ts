/// <reference types="node" />
import 'dotenv/config';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LogUserInDto } from './dto/LogUserInDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
export declare class UserService {
    private readonly userRepository;
    private readonly s3Client;
    constructor(userRepository: Repository<UserEntity>);
    createUser(createUserDto: CreateUserDto, fileName?: string, file?: Buffer): Promise<UserEntity>;
    deleteCurrentUser(currentUserId: number): Promise<import("typeorm").DeleteResult>;
    logInUser(logUserInDto: LogUserInDto): Promise<UserEntity>;
    generateJwt(user: UserEntity): string;
    buildUserResponse(user: UserEntity): UserResponseInterface;
    getUserById(id: number): Promise<UserEntity>;
    updateUser(currentUserId: number, updateUserDto: UpdateUserDto, fileName?: string, file?: Buffer): Promise<UserEntity>;
    getAllUsers(): Promise<{
        results: number;
        users: UserEntity[];
    }>;
    getCurrentUser(currentUserId: number): Promise<UserEntity>;
    getUserByUsername(username: string): Promise<UserEntity>;
}
