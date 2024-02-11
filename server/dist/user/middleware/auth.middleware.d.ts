import 'dotenv/config';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from '../user.services';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: ExpressRequestInterface, _: Response, next: NextFunction): Promise<void>;
}
