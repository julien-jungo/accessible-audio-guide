import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { config } from '../../configurations/config';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, OnDestroy {

  private audio = true;
  private lang = 'de-DE';

  private timeoutIDs: number[] = [];

  private subs: Subscription[] = [];

  public guide: Element[] = [];

  public index = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.audio = params['audio'] ? params['audio'] === 'on' : this.audio;
    this.lang = params['lang'] ? params['lang'] : this.lang;

    this.subs.push(
      this.route.data.subscribe(data => {
        this.guide = data['guide'];
      })
    );

    this.subs.push(
      this.index.subscribe(_ => {
        if (this.isAvailable()) {
          this.scroll();
          if (this.audio) {
            this.speak();
          }
        }
      })
    );
  }

  public ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public isAvailable() {
    return this.index.value !== undefined;
  }

  private speak() {
    const index = this.index.value!;
    const element = this.guide[index];
    this.speechService.speak({
      text: element.text,
      lang: this.lang
    })
  }

  private scroll() {
    const id = `${this.index.value}`;
    document.getElementById(id)!.scrollIntoView();
  }

  public onTap(index: number) {
    this.timeoutIDs.push(setTimeout(() => this.index.next(index), 200));
  }

  public onClick() {
    // ignore - prevents unwanted scrolling
  }

  public onSwipeDown() {
    switch (config.variant) {
      case 'V1':
        return this.onSwipeDownV1();
      case 'V2':
        return this.onSwipeDownV2();
      default:
        throw new Error('No variant is set');
    }
  }

  public onSwipeUp() {
    switch (config.variant) {
      case 'V1':
        return this.onSwipeUpV1();
      case 'V2':
        return this.onSwipeUpV2();
      default:
        throw new Error('No variant is set');
    }
  }

  public onSwipeRight() {
    switch (config.variant) {
      case 'V1':
        return this.onSwipeRightV1();
      case 'V2':
        return this.onSwipeRightV2();
      default:
        throw new Error('No variant is set');
    }
  }

  public onSwipeLeft() {
    switch (config.variant) {
      case 'V1':
        return this.onSwipeLeftV1();
      case 'V2':
        return this.onSwipeLeftV2();
      default:
        throw new Error('No variant is set');
    }
  }

  private onSwipeDownV1() {
    if (this.isAvailable()) {
      const min = Math.min(this.index.value! + 1, this.guide.length);
      const segment = this.guide.slice(min, this.guide.length);
      const next = segment.find(el => el.tag.charAt(0) === 'h');
      if (next) this.index.next(this.guide.indexOf(next));
    }
  }

  private onSwipeDownV2() {
    if (this.isAvailable()) {
      const index = this.index.value!;
      const current = this.guide.at(index)!;

      for (let i = index + 1; i < this.guide.length; i++) {
        const cmp = this.compareLevel(
          current.tag, this.guide.at(i)!.tag);

        if (cmp < 0) {
          this.index.next(i);
          return;
        } else {
          break;
        }
      }
    }
  }

  private onSwipeUpV1() {
    if (this.isAvailable()) {
      const max = Math.max(this.index.value!, 0)
      const segment = this.guide.slice(0, max).reverse();
      const prev = segment.find(el => el.tag.charAt(0) === 'h');
      if (prev) this.index.next(this.guide.indexOf(prev));
    }
  }

  private onSwipeUpV2() {
    if (this.isAvailable()) {
      const index = this.index.value!;
      const current = this.guide.at(index)!;

      for (let i = index - 1; i >= 0; i--) {
        const cmp = this.compareLevel(
          current.tag, this.guide.at(i)!.tag);

        if (cmp > 0) {
          this.index.next(i);
          return;
        } else {
          continue;
        }
      }
    }
  }

  private onSwipeRightV1() {
    if (this.isAvailable()) {
      const max = this.guide.length - 1;
      const next = Math.min(
        this.index.value! + 1, max);
      this.index.next(next);
    }
  }

  private onSwipeRightV2() {
    if (this.isAvailable()) {
      const index = this.index.value!;
      const current = this.guide.at(index)!;

      for (let i = index + 1; i < this.guide.length; i++) {
        const cmp = this.compareLevel(
          current.tag, this.guide.at(i)!.tag);

        if (cmp === 0) {
          this.index.next(i);
          return;
        } else if (cmp > 0) {
          return;
        }
      }
    }
  }

  private onSwipeLeftV1() {
    if (this.isAvailable()) {
      const min = 0;
      const next = Math.max(
        this.index.value! - 1, min);
      this.index.next(next);
    }
  }

  private onSwipeLeftV2() {
    if (this.isAvailable()) {
      const index = this.index.value!;
      const current = this.guide.at(index)!;

      for (let i = index - 1; i >= 0; i--) {
        const cmp = this.compareLevel(
          current.tag, this.guide.at(i)!.tag);

        if (cmp === 0) {
          this.index.next(i);
          return;
        } else if (cmp > 0) {
          return;
        }
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
