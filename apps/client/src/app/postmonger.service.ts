import { Injectable } from '@angular/core';
import * as Postmonger from 'postmonger';
import { BehaviorSubject, bindCallback, Observable } from 'rxjs';
import { IActivityData, IEndPoints, IPayload, ITokens } from './models';

@Injectable({
  providedIn: 'root',
})

// https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-app-development.meta/mc-app-development/using-postmonger.htm
export class PostMongerService {
  public payload$!: BehaviorSubject<IPayload>;
  private connection: any;

  constructor() {
    console.log('Server constructor');
    this.connection = new Postmonger.Session();

    this.connection.on('initActivity', (payload: IPayload) => {
      console.log('Init activity', payload);
      this.payload$ = new BehaviorSubject(payload);
    });

    this.connection.on('clickedNext', () => {
      console.log('Next step clicked');
      this.saveData();
    });

    this.connection.trigger('ready');
    this.enableSave(false);
  }

  enableSave(enabled: boolean): void {
    console.log(enabled);
    const settings = {
      button: 'step1',
      text: 'done',
      visible: true,
      enabled: enabled,
    };
    this.connection.trigger('updateButton', settings);
  }

  updateActivityData(data: IActivityData) {
    const updatedPayload = { ...this.payload$.value };

    updatedPayload.metaData.isConfigured = true;
    updatedPayload.arguments.execute.inArguments = {
      id: data.id,
      message: data.message,
    };

    this.payload$.next(updatedPayload);

    // Update payload
    console.log(this.payload$.value);
  }

  saveData(): void {
    console.log(this.payload$.value);
  }
}
