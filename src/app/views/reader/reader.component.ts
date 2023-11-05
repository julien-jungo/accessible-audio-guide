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

  public index = new BehaviorSubject<number | undefined>(undefined);

  private subs: Subscription[] = [];

  public guide!: Element[];

  private audio!: boolean;
  private lang!: string;

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.audio = params['audio'] === 'on';
    this.lang = params['lang']!;

    this.subs.push(
      this.route.data.subscribe(data => {
        this.guide = data['guide'];
        this.ready = true;
      }));

    this.subs.push(
      this.index.subscribe(_ => {
        if (this.isAvailable()) {
          this.scroll();
          this.speak();
        }
      }));
  }

  public ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public isAvailable() {
    return this.index.value !== undefined;
  }

  private speak() {
    this.speechService.speak({
      text: this.guide[this.index.value!].text,
      lang: this.lang
    })
  }

  private scroll() {
    const id = `${this.index.value}`;
    document
      .getElementById(id)!
      .scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
  }

  public onTap(index: number) {
    this.audio && this.index.next(index);
  }

  public onSwipeRight() {
    if (this.isAvailable()) {
      const max = this.guide.length - 1;
      const next = Math.min(
        this.index.value! + 1, max);
      this.index.next(next);
    }
  }

  public onSwipeLeft() {
    if (this.isAvailable()) {
      const min = 0;
      const next = Math.max(
        this.index.value! - 1, min);
      this.index.next(next);
    }
  }

  public onSwipeUp() {
    if (this.isAvailable()) {
      const max = Math.max(this.index.value!, 0)
      const segment = this.guide.slice(0, max).reverse();
      const prev = segment.find(el => el.tag.charAt(0) === 'h');
      if (prev) this.index.next(this.guide.indexOf(prev));
    }
  }

  public onSwipeDown() {
    if (this.isAvailable()) {
      const min = Math.min(this.index.value! + 1, this.guide.length);
      const segment = this.guide.slice(min, this.guide.length);
      const next = segment.find(el => el.tag.charAt(0) === 'h');
      if (next) this.index.next(this.guide.indexOf(next));
    }
  }
}
