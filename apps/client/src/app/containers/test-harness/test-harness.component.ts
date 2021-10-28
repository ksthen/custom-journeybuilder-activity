import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as Postmonger from 'postmonger';
import { take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'jb-test-harness',
  templateUrl: './test-harness.component.html',
  styleUrls: ['./test-harness.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestHarnessComponent implements OnInit {
  constructor(private http: HttpClient) {}

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
      this.http
        .get('./assets/config.json')
        .pipe(
          take(1),
          tap((data) => {
            jbSession.trigger('initActivity', data);
          })
        )
        .subscribe();
    };
  }
}

/*


{
  name: '',
  id: null,
  key: 'REST-1',
  type: 'REST',
  arguments: {
    execute: {
      url: 'https://$DOMAIN/api/execute',
      verb: 'POST',
      body: '',
      header: '',
      format: 'json',
      timeout: 10000,

      inArguments: [
        {
          key: 'id',
          value: 'value1',
          label: 'Title1',
          placeholder: 'Add value1',
          errorText: 'Value 1 is required',
          description: 'Description 1',
          linkText: 'Link 1',
          linkUrl: 'LinkUrl',
          type: 'input',
          required: true,
          visible: true,
        },
        {
          key: 'id2',
          value: 'value2',
          label: 'Title2',
          placeholder: 'Add value1',
          description: 'Description 2',
          errorText: 'Value21 is required',
          linkText: 'Link 2',
          linkUrl: 'LinkUrl',
          type: 'textarea',
          required: true,
          visible: true,
        },
        {
          key: 'id3',
          value: 'value3',
          label: 'Title3',
          placeholder: 'Add value3',
          description: 'Description',
          errorText: 'Value3 is required',
          linkText: 'Link 3',
          linkUrl: 'LinkUrl3',
          type: 'select',
          options: ['option1', 'option2', 'option3'],
          required: true,
          visible: true,
        },
      ],
    },
  },
  configurationArguments: {
    save: {
      url: 'https://$DOMAIN/api/save',
      verb: 'POST',
    },
    publish: {
      url: 'https://$DOMAIN/api/publish',
      verb: 'POST',
    },
    stop: {
      url: 'https://$DOMAIN/api/stop',
      verb: 'POST',
    },
    validate: {
      url: 'https://$DOMAIN/api/validate',
      verb: 'POST',
    },
    applicationExtensionKey: '58bc418d-901d-46a6-8262-6e49d3e08211',
  },
  metaData: {
    icon: 'https://custom-journeybuilder-activity.herokuapp.com/assets/icon.jpg',
    category: 'message',
    iconSmall: null,
    statsContactIcon: null,
    original_icon: 'assets/icon.jpg',
  },
  editable: true,
  outcomes: [
    {
      next: 'WAITBYDURATION-2',
      metaData: {
        invalid: false,
      },
    },
  ],
  errors: null,
});
*/
