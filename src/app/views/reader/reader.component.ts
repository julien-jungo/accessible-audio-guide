import { Component, OnInit } from '@angular/core';
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public ready: boolean = false;

  public current: number = 0;

  public guide: Array<Element> = [{ text: 'Kein Text verfügbar', tag: 'p' }];

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
  ) {}

  public ngOnInit() {
    this.contentService.target('http://localhost:3000/example.md');
    this.contentService.request().subscribe(guide => {
      this.guide = guide || this.guide;
      this.ready = true;
    });
  }

  public set(index: number) {
    this.current = index;
  }

  public next() {
    this.current = Math.min(this.current + 1, this.guide.length - 1);
  }

  public prev() {
    this.current = Math.max(this.current - 1, 0);
  }

  public speak() {
    this.speechService.speak({
      text: this.guide[this.current].text,
      lang: 'de-DE'
    })
  }
}
