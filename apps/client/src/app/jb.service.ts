import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { combineLatest, ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IPayload } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class JourneyBuilderCommunicationService {
  private connection = new Postmonger.Session();
  public payload$ = new ReplaySubject<IPayload>(1);
  public inArguments$ = new ReplaySubject<any[]>(1);

  constructor() {
    // Tell Journey Builder that the app is ready to recieve the initActivity payload
    this.connection.trigger('ready');

    // Recieve payload from Journey Builder
    this.connection.on('initActivity', (payload: IPayload) => {
      console.log('Init activity', payload);
      this.payload$.next(payload);
      this.inArguments$.next(payload.arguments.execute.inArguments);
    });

    // Trigger save when user cilkcs 'next'
    this.connection.on('clickedNext', () => {
      console.log('Next step clicked');
      this.saveData();
    });
  }

  saveData(): void {
    combineLatest([this.payload$, this.inArguments$])
      .pipe(
        take(1),
        map(([payload, inArguments]) => {
          payload.metaData.isConfigured = true;
          payload.arguments.execute.inArguments = inArguments;

          console.log('Saving:', payload);
          this.connection.trigger('updateActivity', payload);
        })
      )
      .subscribe();
  }
}
