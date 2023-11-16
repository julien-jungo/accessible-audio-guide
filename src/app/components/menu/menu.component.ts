import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() maxWidth: string = 'max-w-none';
  @Input() insetX: string = 'inset-x-0';
  @Input() bottom: string = 'bottom-0';

  hidden: boolean = true;

  toggleHidden() {
    this.hidden = !this.hidden;
  }
}
