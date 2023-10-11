import { Component, OnInit } from '@angular/core';
import { GuideService } from "../../services/guide.service";
import { SpeechService } from "../../services/speech.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public ready: boolean = false;

  public guide: string = 'Kein Text verfügbar';

  constructor(
    private readonly guideService: GuideService,
    private readonly speechService: SpeechService,
  ) {}

  public ngOnInit() {
    this.guideService.observe().subscribe(guide => {
      this.guide = guide || this.guide;
      this.ready = true;
    });
  }

  public speak() {
    this.speechService.speak({
      text: this.guide,
      lang: 'de-DE',
    })
  }
}
