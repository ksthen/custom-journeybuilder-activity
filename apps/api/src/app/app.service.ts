import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

import * as JWT from 'jsonwebtoken';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly http: HttpService,
    private configService: ConfigService
  ) {}

  decodeBody(body: any): any | boolean {
    try {
      return JWT.verify(body.toString('utf8'), this.configService.get('JWT'), {
        algorithms: ['HS256'],
      });
    } catch (err) {
      this.logger.log(err);
      return false;
    }
  }

  sendMessage(headers: any, body: any) {
    // TODO - Figure out how the leanplum authorization works
    const url = this.configService.get('REST_ENDPOINT');
    const config = {
      headers: {
        'content-type': 'application/json',
        //  authorization: `Bearer ${this.configService.get('LEANPLUM_TOKEN')}`,
      },
    };

    this.logger.log('Headers');
    this.logger.log(headers);

    // TODO - Figure out what format to provide
    const messageBody = {
      ...headers,
      ...this.decodeBody(body),
    };

    this.logger.log('Body');
    this.logger.log(messageBody);

    // TODO Call Leanplum API and return response
    return this.http.post(url, messageBody, config).pipe(
      map((response) => {
        this.logger.log(response.data);
        return { status: 'Message sent ok' };
      })
    );
  }
}
