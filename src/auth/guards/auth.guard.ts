import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { verify, JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const [scheme, token] = request.headers.authorization.split(' ');

      if (!token || scheme !== 'Bearer') {
        throw new Error();
      }

      verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
