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

  @Post('validate')
  @HttpCode(200)
  validateActivity(@Headers() headers: any, @Body() body: any) {
    this.logger.log(`Headers: ${JSON.stringify(headers)}`);
    this.logger.log(`Body: ${JSON.stringify(body)}`);
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
