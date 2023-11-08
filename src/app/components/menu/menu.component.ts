import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  hidden: boolean = true;

  toggleHidden() {
    this.hidden = !this.hidden;
  }
}
