import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestHarnessComponent } from './test-harness/test-harness.component';
import { CardComponent } from './card/card.component';
import { NotificationComponent } from './notification/notification.component';
import { JsonFormComponent } from './json-form/json-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TestHarnessComponent,
    CardComponent,
    NotificationComponent,
    JsonFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
