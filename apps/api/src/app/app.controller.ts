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

@Controller()
export class AppController {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly appService: AppService) {}

  @Post('publish')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  publishActivity() {
    return { status: 'ok' };
  }

  @Post('save')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  saveActivity() {
    return { status: 'ok' };
  }

  @Post('stop')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  stopActivity() {
    return { status: 'ok' };
  }

  @Post('validate')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  validateActivity() {
    return { status: 'ok' };
  }

  @Post('execute')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  executeActivity(@Headers() headers: any, @Body() body: any) {
    return this.appService.sendMessage(headers, body);
  }
}
