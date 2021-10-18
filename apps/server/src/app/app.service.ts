import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiTest } from '@custom-journeybuilder-activity/data';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getData(): ApiTest {
    return { message: `Welcome to server! ${this.configService.get('JWT')}` };
  }
}
