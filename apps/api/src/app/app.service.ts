import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly http: HttpService,
    private configService: ConfigService
  ) {}

  sendMessage(headers: any) {
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

    // TODO Call Leanplum API and return response
    return this.http.post(url, data, config).pipe(
      map((response) => {
        this.logger.log(response.data);
        return { status: 'Message sent ok2' };
      })
    );
  }
}
