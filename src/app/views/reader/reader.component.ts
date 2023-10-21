import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, OnDestroy {

  public ready: boolean = false;
  public activated: boolean = false;

  public index = new BehaviorSubject<number>(0);

  private subs: Subscription[] = [];

  public guide!: Element[];

  private lang!: string;

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.lang = params['lang']!;

    this.subs.push(
      this.route.data.subscribe(data => {
        this.guide = data['guide'];
        this.ready = true;
      }));

    this.subs.push(
      this.index.subscribe(() => {
        if (this.activated) {
          this.scroll();
          this.speak();
        }
      }));
  }

  public ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private speak() {
    this.speechService.speak({
      text: this.guide[this.index.value].text,
      lang: this.lang
    })
  }

  private scroll() {
    const id = '' + this.index.value;
    document
      .getElementById(id)!
      .scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
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
