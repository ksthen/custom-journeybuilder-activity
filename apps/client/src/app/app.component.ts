import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ApiTest {
  message: string;
}

@Component({
  selector: 'custom-journeybuilder-activity-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public apiTest$!: Observable<ApiTest>;

  ngOnInit() {
    this.apiTest$ = this.http
      .get('./api')
      .pipe(map((response) => response as ApiTest));
  }
}
