import { Component, OnInit } from '@angular/core';
import { config } from '../../configurations/config';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  textSingleClick!: string;
  textDoubleClick!: string;
  textLeft!:        string;
  textRight!:       string;
  textUp!:          string;
  textDown!:        string;

  ngOnInit() {
    switch (config.variant) {
      case 'V1':
        this.textSingleClick = 'Zu beliebigem Text wechseln';
        this.textDoubleClick = 'Vorlesen pausieren bzw. fortsetzen';
        this.textLeft        = 'Zum vorherigen Text wechseln';
        this.textRight       = 'Zum nächsten Text wechseln';
        this.textUp          = 'Zur vorherigen Überschrift wechseln';
        this.textDown        = 'Zur nächsten Überschrift wechseln';
        break;
      case 'V2':
        this.textSingleClick = 'Zu beliebigem Text wechseln';
        this.textDoubleClick = 'Vorlesen pausieren bzw. fortsetzen';
        this.textLeft        = 'Zum vorherigen Text gleicher Ebene';
        this.textRight       = 'Zum nächsten Text gleicher Ebene';
        this.textUp          = 'Eine Ebene im Text aufsteigen';
        this.textDown        = 'Eine Ebene im Text absteigen';
        break;
      default:
        throw new Error('No variant is set');
    }
  }
}
