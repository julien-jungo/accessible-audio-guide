import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public text = 'Hello World';

  private synthesis?: SpeechSynthesis;
  private voice?: SpeechSynthesisVoice;

  ngOnInit() {
    this.synthesis = window.speechSynthesis;
    this.voice = this.synthesis.getVoices()
      .filter(voice => voice.lang === 'en')[0];
  }

  speak() {
    const utterance = new SpeechSynthesisUtterance(this.text);

    utterance.voice = this.voice!;

    this.synthesis?.speak(utterance);
  }

}
