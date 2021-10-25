import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestHarnessComponent } from './test-harness/test-harness.component';
import { CardComponent } from './ui-components/slds-card/card.component';
import { NotificationComponent } from './ui-components/slds-notification/notification.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { SldsFormElementComponent } from './ui-components/slds-form-element/slds-form-element.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TestHarnessComponent,
    CardComponent,
    NotificationComponent,
    JsonFormComponent,
    SldsFormElementComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
