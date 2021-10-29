import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile, tap } from 'rxjs';
import { JourneyBuilderCommunicationService } from '../../jb.service';
import { IInArgument, IPayload } from '../../models';

// https://github.com/bahurudeen/dynamicform/tree/master/src

@Component({
  selector: 'jb-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
  private alive = true;
  public form = new FormGroup({});
  public payload!: IPayload;

  constructor(
    private formBuilder: FormBuilder,
    public jbService: JourneyBuilderCommunicationService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Build form
    this.jbService.payload$
      .pipe(
        takeWhile(() => this.alive),
        tap((payload) => {
          this.buildAndUpdateForm(payload);
        })
      )
      .subscribe();

    // Subscribe to changes and notify jb Service
    this.form.valueChanges
      .pipe(
        takeWhile(() => this.alive),
        tap((formValue) => {
          const updatedInArguments =
            this.payload?.arguments?.execute?.inArguments?.map((argument) => {
              return { ...argument, value: formValue[argument.key] };
            });

          // Copy so that we do not mutate state. There is more performant way of doing this...
          const updatedPayload: IPayload = JSON.parse(
            JSON.stringify(this.payload)
          );
          updatedPayload.arguments.execute.inArguments = updatedInArguments;
          this.jbService.updatePayload(updatedPayload);
        })
      )
      .subscribe();
  }

  buildAndUpdateForm(payload: IPayload) {
    this.payload = payload;
    payload.arguments.execute.inArguments.forEach((inArgument: IInArgument) => {
      if (!inArgument.key || !inArgument.type) {
        return;
      }

      // Build form
      if (!this.form.get(inArgument.key)) {
        this.form.addControl(
          inArgument.key,
          this.formBuilder.control(
            inArgument.value,
            inArgument.required ? [Validators.required] : []
          ),
          // Do not emit
          { emitEvent: false }
        );
      }

      // Patch form
      else {
        this.form.patchValue(
          { [inArgument.key]: inArgument.value },
          // Do not emit
          { onlySelf: true, emitEvent: false }
        );
      }
    });
    // Trigger change detection
    this.changeDetection.markForCheck();
  }

  hasError(inArgument: IInArgument): boolean {
    return !this.form.get(inArgument.key)?.valid &&
      this.form.get(inArgument.key)?.touched
      ? true
      : false;
  }

  trackByFn(index: number, item: IInArgument): string {
    return item.key;
  }

  ngOnDestroy() {
    // Make sure we unsubscribe to all observables to avoid memory leaks
    this.alive = false;
  }
}
