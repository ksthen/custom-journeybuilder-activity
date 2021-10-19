import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiTest } from '@custom-journeybuilder-activity/data';
import { PostMongerService } from './postmonger.service';

@Component({
  selector: 'custom-journeybuilder-activity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private pm: PostMongerService) {}

  public apiTest$!: Observable<ApiTest>;
  public currentStep = 'step1';

  ngOnInit() {
    this.apiTest$ = this.http
      .get('./api')
      .pipe(map((response) => response as ApiTest));

    this.pm.ready();
    this.pm.requestTokens();
    this.pm.requestEndpoints();
  }

  toggleActive(valid: boolean) {
    this.pm.activateStep(valid, this.currentStep);
  }

  enableSave(status: boolean) {}
}
