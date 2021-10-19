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
import { IActivityData } from '../models';

@Component({
  selector: 'custom-journeybuilder-activity-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  private fromSubscription!: Subscription;

  @Input() data!: IActivityData;
  @Output() formValid = new EventEmitter<boolean>();
  @Output() activityData = new EventEmitter<IActivityData>();

  public form = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.fromSubscription = this.form.valueChanges.subscribe(
      (data: IActivityData) => {
        this.formValid.emit(this.form.valid);

        if (this.form.valid) {
          this.activityData.emit(data);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.fromSubscription.unsubscribe();
  }
}
