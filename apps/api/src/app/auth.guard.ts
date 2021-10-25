import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { bindCallback, Observable, Subject } from 'rxjs';

import * as JWT from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.body.toString('utf8');

    try {
      const verified = JWT.verify(token, this.configService.get('JWT'), {
        algorithms: ['HS256'],
      });
      this.logger.log(verified);
      return true;
    } catch (err) {
      this.logger.log(err);
      return false;
    }
  }
}
