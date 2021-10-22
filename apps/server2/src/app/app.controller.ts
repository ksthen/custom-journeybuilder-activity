import { Body, Headers, Controller, HttpCode, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}

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
  //@UseGuards(AuthGuard)
  @HttpCode(200)
  async validateActivity(@Headers() headers: any, @Body() body: any) {
    return { status: 'ok' };
    //return this.appService.sendMessage(headers);
  }

  @Post('execute')
  //@UseGuards(AuthGuard)
  @HttpCode(200)
  async executeActivity(@Headers() headers: any, @Body() body: any) {
    return { status: 'ok' };
    //return this.appService.sendMessage(headers);
  }
}
