import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
  validateActivity(@Headers() headers: any) {
    return this.appService.sendMessage(headers);
  }

  @Post('execute')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  executeActivity(@Headers() headers: any) {
    return this.appService.sendMessage(headers);
  }
}
