import { Body, Controller, Get, HttpCode, console, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('publish')
  @HttpCode(200)
  publishActivity(@Body() message: any) {
    console.log(`Publish: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('save')
  @HttpCode(200)
  saveActivity(@Body() message: any) {
    console.log(`Save: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('stop')
  @HttpCode(200)
  stopActivity(@Body() message: any) {
    console.log(`Stop: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('validate')
  @HttpCode(200)
  validateActivity(@Body() message: any) {
    console.log(`Validate: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }

  @Post('execute')
  @HttpCode(200)
  executeActivity(@Body() message: any) {
    console.log(`Exectue: ${JSON.stringify(message)}`);
    return { status: 'ok' };
  }
}
