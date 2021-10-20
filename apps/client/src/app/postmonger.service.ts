import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IActivityData, IEndPoints, IPayload, KeyValue } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class PostMongerService {
  private connection = new Postmonger.Session();
  public payload$ = new ReplaySubject<IPayload>();
  public inArguments$ = new ReplaySubject<any[]>();

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
    this.enableSave(false);
  }

  enableSave(enabled: boolean): void {
    console.log('Enable save:', enabled);
    const settings = {
      button: 'step1',
      text: 'done',
      visible: true,
      enabled: enabled,
    };

    this.connection.trigger('updateButton', settings);
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
