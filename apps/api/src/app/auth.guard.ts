import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

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

    const header = request.headers;
    this.logger.log(header);

    const token = request.body.toString('utf8');
    this.logger.log(token);

    return JWT.verify(
      token,
      this.configService.get('JWT'),
      (err: Error, decoded: any) => {
        if (err) {
          this.logger.log(err);
          return false;
        }
        this.logger.log(decoded);
        return true;
      }
    );
  }
}
