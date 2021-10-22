import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime, map, takeWhile, tap } from 'rxjs/operators';
import { JourneyBuilderCommunicationService } from '../jb.service';

@Component({
  selector: 'jb-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class JsonFormComponent implements OnInit {
  public form!: FormGroup;
  private alive = true;

  constructor(
    private fb: FormBuilder,
    public jb: JourneyBuilderCommunicationService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.jb.payload$
      .pipe(
        tap((json) => {
          this.form.patchValue(
            {
              json: JSON.stringify(json, null, 2),
            },
            { emitEvent: false, onlySelf: true }
          );
        })
      )
      .subscribe();
  }

  buildForm() {
    this.form = this.fb.group({
      json: ['', [Validators.required, this.validateJson()]],
    });

    this.form.valueChanges
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(800),
        map((formValue) => {
          if (!this.form.valid) {
            return;
          } else {
            console.log(formValue);
            this.jb.payload$.next(JSON.parse(formValue.json));
          }
        })
      )
      .subscribe();
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

  ngOnDestroy() {
    this.alive = false;
  }
}
