import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SpeechService } from "../../services/speech.service";
import { ContentService, Element } from "../../services/content.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { AudioService } from "../../services/audio.service";
import { config } from "../../configurations/config";

interface Map { [direction: string]: number | undefined }

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit, OnDestroy {

  private lang = 'de-DE';

  private behavior = config.swipeBehavior;

  private swipeTimeoutIDs: Map = {
    RIGHT: undefined,
    LEFT:  undefined,
    DOWN:  undefined,
    UP:    undefined
  }

  private tapTimeoutIDs: number[] = [];

  private subs: Subscription[] = [];

  public guide: Element[] = [];

  public audio: BehaviorSubject<boolean>;

  public index = new BehaviorSubject<number | undefined>(undefined);

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
      this.tapTimeoutIDs.push(setTimeout(() => {
        this.index.next(index);
      }, 300));
    }
  }

  public onDoubleTap(e: any) {
    if (e.tapCount === 2) {
      this.tapTimeoutIDs.forEach(id => clearTimeout(id));
      this.speechService.togglePlay();
    }
  }

  public onSwipeRight() {
    this.onSwipe('RIGHT',
      () => this.indexForSingleSwipeRight(),
      () => this.indexForDoubleSwipeRight());
  }

  public onSwipeLeft() {
    this.onSwipe('LEFT',
      () => this.indexForSingleSwipeLeft(),
      () => this.indexForDoubleSwipeLeft());
  }

  public onSwipeDown() {
    this.onSwipe('DOWN',
      () => this.indexForSingleSwipeDown(),
      () => this.indexForDoubleSwipeDown());
  }

  public onSwipeUp() {
    this.onSwipe('UP',
      () => this.indexForSingleSwipeUp(),
      () => this.indexForDoubleSwipeUp());
  }

  private onSwipe(direction: string,
                  indexForSingleSwipe: () => number,
                  indexForDoubleSwipe: () => number) {
    if (this.swipeTimeoutIDs[direction] === undefined) {
      this.swipeTimeoutIDs[direction] = setTimeout(() => {
        this.swipeTimeoutIDs[direction] = undefined;
        this.index.next(indexForSingleSwipe());
      }, 300);
    } else {
      clearTimeout(this.swipeTimeoutIDs[direction]);
      this.swipeTimeoutIDs[direction] = undefined;
      this.index.next(indexForDoubleSwipe());
    }
  }

  private indexForSingleSwipeRight() {
    return this.behavior.singleSwipeRightCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForDoubleSwipeRight() {
    return this.behavior.doubleSwipeRightCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForSingleSwipeLeft() {
    return this.behavior.singleSwipeLeftCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForDoubleSwipeLeft() {
    return this.behavior.doubleSwipeLeftCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForSingleSwipeDown() {
    return this.behavior.singleSwipeDownCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForDoubleSwipeDown() {
    return this.behavior.doubleSwipeDownCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForSingleSwipeUp() {
    return this.behavior.singleSwipeUpCommand
      .findIndex(this.guide, this.index.value!);
  }

  private indexForDoubleSwipeUp() {
    return this.behavior.doubleSwipeUpCommand
      .findIndex(this.guide, this.index.value!);
  }
}
