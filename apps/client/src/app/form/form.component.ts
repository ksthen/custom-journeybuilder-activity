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
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { JourneyBuilderCommunicationService } from '../jb.service';
import { IInArgument, IPayload } from '../models';

@Component({
  selector: 'jb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FormComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject();

  public form = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    public jb: JourneyBuilderCommunicationService
  ) {}

  ngOnInit(): void {
    // Build the form
    this.form = this.fb.group({
      id: ['', Validators.required],
      message: ['', Validators.required],
      volvoId: ['', Validators.required],
    });

    // Set value when model is updated

    this.jb.payload$
      .pipe(
        takeUntil(this.unsubscribe),
        tap((payload) => {
          payload.arguments.execute.inArguments.forEach((inArgument) =>
            this.form.patchValue(
              { ...inArgument },
              { onlySelf: true, emitEvent: false }
            )
          );
        })
      )
      .subscribe();

    // Subcribe to form changes and update model
    this.form.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        map((value: any) => {
          if (this.form.valid) {
            const inArguments: IInArgument[] = [
              {
                id: value.id,
              },
              {
                message: value.message,
              },
              {
                volvoId: value.volvoId,
              },
            ];
            this.jb.updatePayload(inArguments);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
