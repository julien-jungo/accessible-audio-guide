import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

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

  @ViewChild('info')
  private info!: ElementRef;

  @ViewChild('menu')
  private menu!: ElementRef;

  @HostListener('document:click', ['$event'])
  private onClick(e: Event) {
    if (!this.hidden) {
      if (!this.info.nativeElement.contains(e.target)
        && !this.menu.nativeElement.contains(e.target)) {
        this.hidden = true;
      }
    }
  }

  toggleHidden() {
    this.hidden = !this.hidden;
  }
}
