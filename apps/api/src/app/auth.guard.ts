import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { bindCallback, Observable, Subject } from 'rxjs';

import { AppService } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly service: AppService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.service.decodeBody(context.switchToHttp().getRequest().body)
      ? true
      : false;
  }
}
