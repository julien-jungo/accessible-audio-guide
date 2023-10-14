import { Component, OnInit } from '@angular/core';
import { GuideService } from "../../services/guide.service";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public ready: boolean = false;

  public guide: Array<Element> = [{ text: 'Kein Text verfügbar', tag: 'p' }];

  constructor(
    private readonly contentService: ContentService,
    private readonly guideService: GuideService,
    private readonly speechService: SpeechService,
  ) {}

  public ngOnInit() {
    this.guideService.observe().subscribe(guide => {
      this.guide = guide || this.guide;
      this.ready = true;
    });
  }

  public speak(text: string) {
    this.speechService.speak({ text, lang: 'de-DE' })
  }
}
