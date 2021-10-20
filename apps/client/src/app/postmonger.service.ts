import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { last, map, take, tap } from 'rxjs/operators';
import { IActivityData, IEndPoints, IPayload, KeyValue } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class PostMongerService {
  private connection = new Postmonger.Session();
  public payload$ = new ReplaySubject<IPayload>(1);
  public inArguments$ = new ReplaySubject<any[]>(1);

  constructor() {
    this.connection.on('initActivity', (payload: IPayload) => {
      console.log('POSTMONGER: Init activity', payload);
      this.payload$.next(payload);
      this.inArguments$.next(payload.arguments.execute.inArguments);
    });

    this.connection.on('clickedNext', () => {
      console.log('POSTMONGER: Next step clicked');
      this.saveData();
    });

    this.connection.trigger('ready');
  }

  updateActivityData(inArguments: any[]) {
    this.inArguments$.next([...inArguments]);
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
