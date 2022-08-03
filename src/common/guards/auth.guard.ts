import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from 'src/modules/user/user.service';
import { verifyToken } from 'src/common/utils';
import { SYSTEM } from '../constants/general';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<string[]>(
      SYSTEM.PUBLIC,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { token } = request.headers;
    if (!token) {
      return false;
    }

    const decoded = verifyToken(token, SYSTEM.SECRET);
    if (!decoded) {
      return false;
    }

    const userFromDb = await this.userService.checkIfUserExist(
      decoded,
      'User not found',
    );

    if (!userFromDb) {
      return false;
    }
    request.user = userFromDb;
    return true;
  }
}