import {
  Body,
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
  publishActivity(@Body() message: any) {
    this.logger.log(`Publish: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('save')
  @HttpCode(200)
  saveActivity(@Body() message: any) {
    this.logger.log(`Save: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('stop')
  @HttpCode(200)
  stopActivity(@Body() message: any) {
    this.logger.log(`Stop: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('validate')
  @HttpCode(200)
  validateActivity(@Body() message: any) {
    this.logger.log(`Validate: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('execute')
  @HttpCode(200)
  executeActivity(@Body() message: any) {
    this.logger.log(`Exectue: ${JSON.stringify(message)}`);
    this.appService.sendMessage(message);
    return { status: 'ok' };
  }
}
