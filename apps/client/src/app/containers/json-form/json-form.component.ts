import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime, map, takeWhile, tap } from 'rxjs/operators';
import { JourneyBuilderCommunicationService } from '../../jb.service';

@Component({
  selector: 'jb-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class JsonFormComponent implements OnInit {
  public form = new FormGroup({});
  private alive = true;

  constructor(
    private fb: FormBuilder,
    public jbService: JourneyBuilderCommunicationService
  ) {}

  ngOnInit() {
    this.jbService.payload$
      .pipe(
        takeWhile(() => this.alive),
        tap((data) => {
          const json: string = JSON.stringify(data, null, 2);

          if (!this.form.get('json')) {
            this.form = this.fb.group({
              json: [json, [Validators.required, this.validateJson()]],
            });
          }

          this.form.patchValue(
            {
              json,
            },
            { emitEvent: false, onlySelf: true }
          );
        })
      )
      .subscribe();
  }

  updatePayload() {
    if (!this.form.valid && !this.form?.get('json')?.value) {
      return;
    }
    const updatedPayload = JSON.parse(this.form?.get('json')?.value);
    this.jbService.updatePayload(updatedPayload);
  }

  validateJson(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      try {
        const parsed = JSON.parse(control.value);
      } catch (e: any) {
        return { error: e.toString() };
      }
      return null;
    };
  }

  hasError(formControlName: string): boolean {
    return !this.form.get(formControlName)?.valid &&
      this.form.get(formControlName)?.touched
      ? true
      : false;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
