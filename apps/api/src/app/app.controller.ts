import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

import * as JWT from 'jsonwebtoken';

@Controller()
export class AppController {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Post('publish')
  @HttpCode(200)
  publishActivity() {
    return { status: 'ok' };
  }

  @Post('save')
  @HttpCode(200)
  saveActivity() {
    return { status: 'ok' };
  }

  @Post('stop')
  @HttpCode(200)
  stopActivity() {
    return { status: 'ok' };
  }

  @Post('validate')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  validateActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log('=====Controller====');
    this.logger.log('Headers:');
    this.logger.log(headers);

    const token = body.toString('utf8');

    this.logger.log('Token and JWT');
    this.logger.log(token);
    this.logger.log(this.configService.get('JWT'));

    try {
      const verified = JWT.verify(token, this.configService.get('JWT'), {
        algorithms: ['HS256'],
      });
      this.logger.log('Verified');
      this.logger.log(verified);
      return true;
    } catch (err) {
      this.logger.log('Error');
      this.logger.log(err);
      return false;
    }

    return { status: 'ok' };
    //return this.appService.sendMessage(headers);
  }

  @Post('execute')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  executeActivity(@Headers() headers: any) {
    return this.appService.sendMessage(headers);
  }
}
