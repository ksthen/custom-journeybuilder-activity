import { Injectable, Logger, HttpService } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    private configService: ConfigService
  ) {}

  sendMessage(headers: any): void {
    /*
    // TODO - Figure out how the leanplum authorization works
    const url = this.configService.get('REST_ENDPOINT');
    const config = {
      headers: {
        'content-type': 'application/json',
        //  authorization: `Bearer ${this.configService.get('LEANPLUM_TOKEN')}`,
      },
    };

    // TODO - Figure out what format to provide
    const data = {
      ...headers,
    };

    // Call Leanplum API and return response
    return this.http.post(url, data, config);
    */
  }
}
