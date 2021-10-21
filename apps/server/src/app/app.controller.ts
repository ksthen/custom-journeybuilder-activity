import {
  Body,
  Headers,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Logger } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as JWT from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private readonly logger = new Logger(AppController.name);

  @Post('publish')
  @HttpCode(200)
  publishActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Publish - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Publish - Body: ${JSON.stringify(body)}`);
    this.logger.log(`Publish: ${JSON.stringify(body)}`);
    return { status: 'ok' };
  }

  @Post('save')
  @HttpCode(200)
  saveActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Save - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Save - Body: ${JSON.stringify(body)}`);
    this.logger.log(`Save: ${JSON.stringify(body)}`);
    return { status: 'ok' };
  }

  @Post('stop')
  @HttpCode(200)
  stopActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Stop - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Stop - Body: ${JSON.stringify(body)}`);
    return { status: 'ok' };
  }

  @Post('validate')
  @HttpCode(200)
  validateActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(headers);
    this.logger.log(body);

    const result = JWT.verify(
      body.toString('utf8'),
      this.configService.get('JWT'),
      {
        algorithms: ['HS256'],
      }
    );

    this.logger.log(result);
    return { status: 'ok' };
  }

  @Post('execute')
  @HttpCode(200)
  executeActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Execute - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Execute - Body: ${JSON.stringify(body)}`);
    this.logger.log(body);
    this.appService.sendMessage(body);
    return { status: 'ok' };
  }
}
