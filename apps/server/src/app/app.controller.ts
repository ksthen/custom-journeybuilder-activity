import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('publish')
  publishActivity(@Body() message: any) {
    Logger.log(`Publish: ${message}`);
    return 'ok';
  }

  @Post('save')
  saveActivity(@Body() message: any) {
    Logger.log(`Save: ${message}`);
    return 'ok';
  }

  @Post('stop')
  stopActivity(@Body() message: any) {
    Logger.log(`Stop: ${message}`);
    return 'ok';
  }

  @Post('validate')
  validateActivity(@Body() message: any) {
    Logger.log(`Validate: ${message}`);
    return 'ok';
  }

  @Post('execute')
  executeActivity(@Body() message: any) {
    Logger.log(`Exectue: ${message}`);
    return 'ok';
  }
}
