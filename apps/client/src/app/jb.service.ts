import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IInArgument, IPayload } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class JourneyBuilderCommunicationService {
  private connection = new Postmonger.Session();
  public payload$ = new ReplaySubject<IPayload>(1);

  constructor() {
    // Tell Journey Builder that the app is ready to recieve the initActivity payload
    this.connection.trigger('ready');

    // Recieve payload from Journey Builder
    this.connection.on('initActivity', (payload: IPayload) => {
      this.payload$.next(payload);
    });

    // Trigger save when user cilkcs 'next'
    this.connection.on('clickedNext', () => {
      this.saveData();
    });
  }

  updatePayload(payload: IPayload) {
    this.payload$.next(JSON.parse(JSON.stringify(payload)));
  }

  saveData(): void {
    this.payload$
      .pipe(
        take(1),
        map((payload) => {
          payload.metaData.isConfigured = true;
          this.connection.trigger('updateActivity', payload);
        })
      )
      .subscribe();
  }
}
