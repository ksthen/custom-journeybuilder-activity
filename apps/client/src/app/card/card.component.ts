import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'custom-journeybuilder-activity-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() title: string = 'Custom Activity';
  @Input() icon: string = 'custom_notification';
  @Input() iconCategory: string = 'standard-sprite';

  constructor() {}

  ngOnInit(): void {}
}
