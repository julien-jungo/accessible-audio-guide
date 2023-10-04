import { Component } from '@angular/core';
import { SpeechService } from "../../services/speech.service";

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent {

  public text = 'Hallo Welt';

  constructor(private readonly speechService: SpeechService) {}

  public speak(): void {
    this.speechService.speak({ text: this.text, lang: 'de-DE' });
  }

}
