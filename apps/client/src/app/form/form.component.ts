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
import { PostMongerService } from '../postmonger.service';

@Component({
  selector: 'custom-journeybuilder-activity-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  private fromSubscription!: Subscription;

  public form = new FormGroup({});

  constructor(private fb: FormBuilder, private postMonger: PostMongerService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.fromSubscription = this.form.valueChanges.subscribe(
      (data: IActivityData) => {
        this.postMonger.enableSave(this.form.valid);

        if (this.form.valid) {
          this.postMonger.updateActivityData(this.form.value);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.fromSubscription.unsubscribe();
  }
}
