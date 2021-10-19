import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { BehaviorSubject, bindCallback, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class PostMongerService {
  public initActivity$ = new BehaviorSubject('');
  public requestTokens$ = new BehaviorSubject('');
  public requstedEnPoints$ = new BehaviorSubject('');

  private connection: any;

  constructor() {
    console.log('Server constructor');
    this.connection = new Postmonger.Session();

    this.connection.on('initActivity', (payload: any) => {
      console.log(payload);
      this.initActivity$.next(payload);
    });

    this.connection.on('requestedTokens', (tokens: any) => {
      console.log(tokens);
      this.requestTokens$.next(tokens);
    });

    this.connection.on('requestedTokens', (tokens: any) => {
      console.log(tokens);
      this.requestTokens$.next(tokens);
    });

    this.connection.on('requestedEndpoints', (endpoints: any) => {
      console.log(endpoints);
      this.requstedEnPoints$.next(endpoints);
    });
  }

  ready() {
    this.connection.trigger('ready');
  }

  requestTokens() {
    this.connection.trigger('requestTokens');
  }

  requestEndpoints() {
    this.connection.trigger('requestEndpoints');
  }
}
