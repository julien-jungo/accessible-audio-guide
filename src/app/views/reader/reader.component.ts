import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ViewportScroller } from "@angular/common";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, AfterViewChecked, OnDestroy {

  public ready: boolean = false;
  public activated: boolean = false;

  public guide!: Array<Element>;

  public index = new BehaviorSubject<number>(0);
  private index$!: Subscription;

  private url!: string;
  private lang!: string;

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly scroller: ViewportScroller,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    const params = this.route.snapshot.queryParamMap;

    this.url = params.get('url')!;
    this.lang = params.get('lang')!;
    this.index.next(+params.get('index')!);

    this.index$ = this.index
      .subscribe(() => {
        if (this.activated) {
          this.scroll();
          this.speak();
        }
      });

    this.contentService
      .request(this.url)
      .subscribe(guide => {
        this.guide = guide;
        this.ready = true;
      });
  }

  public ngAfterViewChecked() {
    if (this.ready && !this.activated) this.scroll();
  }

  public ngOnDestroy() {
    this.index$.unsubscribe();
  }

  private speak() {
    this.speechService.speak({
      text: this.guide[this.index.value].text,
      lang: this.lang
    })
  }

  private scroll() {
    this.scroller.scrollToAnchor('' + this.index.value);
  }

  public onTap(index: number) {
    this.activated = true;
    this.index.next(index);
  }

  public onSwipeRight() {
    if (this.activated) {
      const max = this.guide.length - 1;
      const next = Math.min(
        this.index.value + 1, max);
      this.index.next(next);
    }
  }

  public onSwipeLeft() {
    if (this.activated) {
      const min = 0;
      const next = Math.max(
        this.index.value - 1, min);
      this.index.next(next);
    }
  }
}
