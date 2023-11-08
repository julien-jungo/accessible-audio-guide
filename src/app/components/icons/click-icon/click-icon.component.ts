import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-click-icon',
  templateUrl: './click-icon.component.html',
  styleUrls: ['./click-icon.component.scss']
})
export class ClickIconComponent {
  @Input() width!: string;
  @Input() height!: string;
}
