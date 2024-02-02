import 'dotenv/config';
import { ExpressRequestInterface } from '../../types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UserService } from '../user.services';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      return next();
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = verify(token, process.env.JWTSECRET) as JwtPayload;
      const user = await this.userService.getUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
