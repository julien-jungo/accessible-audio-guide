import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { config } from '../../configurations/config';
import { AudioService } from "../../services/audio.service";
import { ISwipeBehavior } from "../../behaviors/ISwipeBehavior";

const TEXT_SIZES = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, OnDestroy {

  private behavior: ISwipeBehavior = config.swipeBehavior;

  private lang = 'de-DE';

  private timeoutIDs: number[] = [];

  private subs: Subscription[] = [];

  public guide: Element[] = [];

  public audio: BehaviorSubject<boolean>;

  public index = new BehaviorSubject<number | undefined>(undefined);

  public textSizes: {[heading: string]: string} = {};

  constructor(
    private readonly contentService: ContentService,
    private readonly speechService: SpeechService,
    private readonly audioService: AudioService,
    private readonly route: ActivatedRoute,
  ) {
    this.audio = audioService.audio;
  }

  public ngOnInit() {
    const params = this.route.snapshot.queryParams;

    this.audioService.initAudio(params['audio'] === 'on');
    this.lang = params['lang'] ? params['lang'] : this.lang;

    this.subs.push(
      this.route.data.subscribe(data => {
        this.guide = data['guide'];
        this.initTextSizes();
      })
    );

    this.subs.push(
      this.index.subscribe(_ => {
        if (this.isAvailable()) {
          this.scroll();
          if (this.audio.value) {
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

  private initTextSizes() {
    let i = this.guide // compute max heading level
      .map(e => e.tag.charAt(0) === 'h' ? +e.tag.charAt(1) : 0)
      .reduce((acc, curr) => Math.max(acc, curr));

    for (const textSize of TEXT_SIZES) {
      this.textSizes['h' + i--] = textSize;
      if (i === 0) break;
    }
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

  public onTap(e: any, index: number) {
    if (e.tapCount === 1) {
      this.timeoutIDs.push(setTimeout(() => {
        this.index.next(index);
      }, 300));
    }
  }

  public onDoubleTap(e: any) {
    if (e.tapCount === 2) {
      this.timeoutIDs.forEach(id => clearTimeout(id));
      this.speechService.togglePlay();
    }
  }

  public onSwipeDown() {
    this.index.next(this.behavior.swipeDownCommand
      .findIndex(this.guide, this.index.value!));
  }

  public onSwipeUp() {
    this.index.next(this.behavior.swipeUpCommand
      .findIndex(this.guide, this.index.value!));
  }

  public onSwipeRight() {
    this.index.next(this.behavior.swipeRightCommand
      .findIndex(this.guide, this.index.value!));
  }

  public onSwipeLeft() {
    this.index.next(this.behavior.swipeLeftCommand
      .findIndex(this.guide, this.index.value!));
  }
}
