import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiTest } from '@custom-journeybuilder-activity/data';
import { PostMongerService } from './postmonger.service';
import { IActivityData } from './models';

@Component({
  selector: 'custom-journeybuilder-activity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private saveClickedSubscription = new Subscription();

  constructor(private pm: PostMongerService) {}

  ngOnInit() {}

  enableSave(enabled: boolean) {
    this.pm.enableSave(enabled);
  }

  updatActivityData(data: IActivityData) {
    this.pm.updateActivityData(data);
  }
}
