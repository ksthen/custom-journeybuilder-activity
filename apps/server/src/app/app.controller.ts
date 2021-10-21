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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  //@UseGuards(JwtAuthGuard)
  @Post('validate')
  @HttpCode(200)
  validateActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Validate - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Validate - Body: ${body}`);
    this.logger.log(`Validate - Body: ${JSON.stringify(body)}`);
    return { status: 'ok' };
  }

  @Post('execute')
  @HttpCode(200)
  executeActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Execute - Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Execute - Body: ${JSON.stringify(body)}`);
    this.appService.sendMessage(body);
    return { status: 'ok' };
  }
}
