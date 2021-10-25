import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'slds-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @Input() text: string = '';
  @Input() link: string = '';
  @Input() linkText: string = '';

  constructor() {}

  ngOnInit(): void {}
}
