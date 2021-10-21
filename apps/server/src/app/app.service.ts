import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    private configService: ConfigService
  ) {}

  sendMessage(message: any): void {
    const url = this.configService.get('REST_ENDPOINT');

    this.http
      .post(url, message)
      .pipe(
        take(1),
        map((response) => console.log(response.status, response.statusText))
      )
      .subscribe();
  }
}
