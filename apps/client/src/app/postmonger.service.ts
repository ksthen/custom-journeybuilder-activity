import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { BehaviorSubject, bindCallback, Observable } from 'rxjs';
import { IEndPoints, IInitPayload, ITokens } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class PostMongerService {
  public initActivity$ = new BehaviorSubject({});
  public requestTokens$ = new BehaviorSubject({});
  public requstedEnPoints$ = new BehaviorSubject({});

  public clickNext$ = new BehaviorSubject({});

  private connection: any;

  constructor() {
    console.log('Server constructor');
    this.connection = new Postmonger.Session();

    this.connection.on('initActivity', (payload: IInitPayload) => {
      console.log('Init activity', payload);
      this.initActivity$.next(payload);
    });

    this.connection.on('requestedTokens', (tokens: ITokens) => {
      console.log('Request tokens', tokens);
      this.requestTokens$.next(tokens);
    });

    this.connection.on('requestedEndpoints', (endpoints: IEndPoints) => {
      console.log('Requested endpoints', endpoints);
      this.requstedEnPoints$.next(endpoints);
    });

    this.connection.on('clickedNext', () => {
      console.log('Next step clicked');
    });

    this.connection.on('clickedBack', () => {
      console.log('Click back');
    });

    this.connection.on('gotoStep', (step: any) => {
      console.log('Goto', step);
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

  activateSave(status: boolean): void {
    const settings = {
      button: 'step1',
      text: 'done',
      visible: true,
      enabled: status,
    };
    this.connection.trigger('updateButton', settings);
  }
}
