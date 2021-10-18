import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getData(): { message: string } {
    return { message: `Welcome to server! ${this.configService.get('JWT')}` };
  }
}
