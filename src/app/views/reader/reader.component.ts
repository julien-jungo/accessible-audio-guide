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
        block: 'nearest'
      });
  }

  public onTap(index: number) {
    this.audio && this.index.next(index);
  }

  public onSwipeDown() {
    if (this.isAvailable()) {
      const max = this.guide.length - 1;
      const next = Math.min(
        this.index.value! + 1, max);
      this.index.next(next);
    }
  }

  public onSwipeUp() {
    if (this.isAvailable()) {
      const min = 0;
      const next = Math.max(
        this.index.value! - 1, min);
      this.index.next(next);
    }
  }

  public onSwipeLeft() {
    if (this.isAvailable()) {
      const index = this.index.value!
      const current = this.guide.at(index)!;

      for (let i = index - 1; i > 0; i--) {
        const prev = this.guide.at(i)!;
        const comp = this.compareLevel(
          current.tag, prev.tag);

        if (comp === 0) this.index.next(i);
        if (comp >= 0) return;
      }
    }
  }

  public onSwipeRight() {
    if (this.isAvailable()) {
      const index = this.index.value!
      const current = this.guide.at(index)!;

      for (let i = index + 1; i < this.guide.length; i++) {
        const next = this.guide.at(i)!;
        const comp = this.compareLevel(
          current.tag, next.tag);

        if (comp === 0) this.index.next(i);
        if (comp >= 0) return;
      }
    }
  }

  private compareLevel(a: string, b: string) {
    const levelA = this.getLevel(a);
    const levelB = this.getLevel(b);

    return levelA && levelB
      ? levelA - levelB
      : levelA
        ? -1
        : levelB
          ? 1
          : 0;
  }

  private getLevel(tag: string) {
    return tag.charAt(0) === 'h'
      ? +tag.charAt(1)
      : undefined;
  }
}
