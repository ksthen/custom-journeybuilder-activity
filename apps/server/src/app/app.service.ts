import { HttpService, Injectable } from '@nestjs/common';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private http: HttpService) {}

  sendMessage(message: any): void {
    const url = 'https://enihua4do8m1mvo.m.pipedream.net';
    this.http
      .post(url, message)
      .pipe(
        take(1),
        map((response) => console.log(response.status, response.statusText))
      )
      .subscribe();
  }
}
