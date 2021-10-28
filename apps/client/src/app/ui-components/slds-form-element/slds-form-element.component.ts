import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'slds-form-element',
  templateUrl: './slds-form-element.component.html',
  styleUrls: ['./slds-form-element.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SldsFormElementComponent implements OnInit {
  @Input() hasError: boolean | undefined = false;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() errorText = '';

  constructor() {}

  ngOnInit(): void {}
}
