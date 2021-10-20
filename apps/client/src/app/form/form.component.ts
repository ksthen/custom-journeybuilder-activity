import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IActivityData, IPayload } from '../models';
import { PostMongerService } from '../postmonger.service';

@Component({
  selector: 'custom-journeybuilder-activity-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  private fromSubscription!: Subscription;
  private inArgumentsSubscription!: Subscription;

  public form = new FormGroup({});

  constructor(private fb: FormBuilder, public postMonger: PostMongerService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', Validators.required],
    });

    // Set initial value
    this.inArgumentsSubscription = this.postMonger.inArguments$
      .pipe(
        tap((inArguments) => {
          inArguments.forEach((arg) =>
            this.form.patchValue(
              { ...arg },
              { onlySelf: true, emitEvent: false }
            )
          );
        })
      )
      .subscribe();

    // Subcribe to form changes and trigger postmonger to update data
    this.fromSubscription = this.form.valueChanges.subscribe((data: any) => {
      if (this.form.valid) {
        const inArguments = [
          {
            id: data.id,
          },
          {
            message: data.message,
          },
          {
            email: data.email,
          },
        ];

        this.postMonger.updateActivityData(inArguments);
      }
    });
  }

  ngOnDestroy(): void {
    this.fromSubscription.unsubscribe();
    this.inArgumentsSubscription.unsubscribe();
  }
}
