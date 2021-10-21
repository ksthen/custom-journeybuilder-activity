import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.logger.log('error' + err);
    this.logger.log('user' + user);
    this.logger.log('info' + info);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
