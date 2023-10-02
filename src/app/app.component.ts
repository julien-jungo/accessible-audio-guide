import { Component } from '@angular/core';
import { SpeechService } from "./services/speech.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public text = 'Hallo Welt';

  constructor(private readonly speechService: SpeechService) {}

  public speak(): void {
    this.speechService.speak({ text: this.text, lang: 'de-DE' });
  }

}
