import { OnInit, AfterViewChecked, Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, AfterViewChecked {

  public ready: boolean = false;

  public guide!: Array<Element>;

  // query params
  public curr!: number;
  private url!: string;
  private lang!: string;

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngAfterViewChecked() {
    if (this.ready) {
      this.scroll({
        behavior: 'auto',
        block: 'start'
      })
    }
  }

  public ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    this.url = params.get('url')!;
    this.lang = params.get('lang')!;
    this.curr = +params.get('index')!;

    this.contentService
      .request(this.url)
      .subscribe(guide => {
        this.guide = guide;
        this.ready = true;
        this.speak();
      });
  }

  private speak() {
    this.speechService.speak({
      text: this.guide[this.curr].text,
      lang: this.lang
    })
  }

  private scroll(options: ScrollIntoViewOptions) {
    const id = '' + this.curr;
    document
      .getElementById(id)!
      .scrollIntoView(options);
  }

  private setAndScroll(index: number) {
    this.curr = index;
    this.scroll({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  public setAndSpeak(index: number) {
    this.setAndScroll(index);
    this.speak();
  }

  public nextAndSpeak() {
    this.setAndSpeak(
      Math.min(
        this.curr + 1,
        this.guide.length - 1)
    );
  }

  public prevAndSpeak() {
    this.setAndSpeak(
      Math.max(
        this.curr - 1, 0)
    );
  }
}
