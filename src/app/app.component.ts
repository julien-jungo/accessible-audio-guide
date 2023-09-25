import { Component } from '@angular/core';
import { SpeechService } from "./services/speech.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public text = 'Hello World';

  constructor(private readonly speechService: SpeechService) {}

  speak() {
    try {
      this.speechService.speak(this.text);
    } catch (error) {
      console.error('Speech Synthesis is not available');
    }
  }

}
