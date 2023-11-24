import { Component, Input } from '@angular/core';
import { config } from '../../configurations/config';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() maxWidth = 'max-w-none';
  @Input() insetX   = 'inset-x-0';
  @Input() bottom   = 'bottom-0';

  textSwipeRight = config.swipeBehavior.swipeRightCommand.description;
  textSwipeLeft  = config.swipeBehavior.swipeLeftCommand.description;
  textSwipeDown  = config.swipeBehavior.swipeDownCommand.description;
  textSwipeUp    = config.swipeBehavior.swipeUpCommand.description;
}
