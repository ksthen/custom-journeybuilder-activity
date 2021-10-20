import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as Postmonger from 'postmonger';
import { environment } from '../../environments/environment';

@Component({
  selector: 'custom-journeybuilder-activity-test-harness',
  templateUrl: './test-harness.component.html',
  styleUrls: ['./test-harness.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestHarnessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    if (environment.production) {
      return;
    }
    this.setupTestHarness();
  }

  // Mock Jurneybuilder events for development
  setupTestHarness() {
    const jbSession = new Postmonger.Session();
    const jb: any = {};
    (window as any).jb = jb;

    jbSession.on('setActivityDirtyState', (value: any) => {
      console.log('[echo] setActivityDirtyState -> ', value);
    });

    jbSession.on('requestInspectorClose', () => {
      console.log('[echo] requestInspectorClose');
    });

    jbSession.on('updateActivity', (activity: any) => {
      console.log(
        '[echo] updateActivity -> ',
        JSON.stringify(activity, null, 4)
      );
    });

    jbSession.on('ready', () => {
      console.log('[echo] ready');
      jb.ready();
    });

    // fire the ready signal with an example activity
    jb.ready = () => {
      jbSession.trigger('initActivity', {
        name: '',
        key: 'EXAMPLE-1',
        metaData: {},
        configurationArguments: {},
        arguments: {
          executionMode: '{{Context.ExecutionMode}}',
          definitionId: '{{Context.DefinitionId}}',
          activityId: '{{Activity.Id}}',
          contactKey: '{{Context.ContactKey}}',
          execute: {
            inArguments: [
              {
                id: '',
                message: '',
              },
            ],
            outArguments: [],
          },
          startActivityKey: '{{Context.StartActivityKey}}',
          definitionInstanceId: '{{Context.DefinitionInstanceId}}',
          requestObjectId: '{{Context.RequestObjectId}}',
        },
      });
    };
  }
}
