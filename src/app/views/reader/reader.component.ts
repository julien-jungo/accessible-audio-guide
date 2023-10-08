import { Component, OnInit } from '@angular/core';
import { GuideService } from "../../services/guide.service";
import { SpeechService } from "../../services/speech.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public guide!: string;

  constructor(
    private readonly guideService: GuideService,
    private readonly speechService: SpeechService,
  ) {}

  public ngOnInit() {
    this.guide = this.guideService.getGuide() || 'Kein Text verfügbar';
  }

  public speak() {
    this.speechService.speak({
      text: this.guide!,
      lang: 'de-DE',
    })
  }
}
