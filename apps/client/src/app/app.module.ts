import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestHarnessComponent } from './containers/test-harness/test-harness.component';
import { CardComponent } from './ui-components/slds-card/card.component';
import { NotificationComponent } from './ui-components/slds-notification/notification.component';
import { JsonFormComponent } from './containers/json-form/json-form.component';
import { SldsFormElementComponent } from './ui-components/slds-form-element/slds-form-element.component';
import { FormContainerComponent } from './containers/form-container/form-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TestHarnessComponent,
    CardComponent,
    NotificationComponent,
    JsonFormComponent,
    SldsFormElementComponent,
    FormContainerComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
