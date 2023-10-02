import { Injectable } from '@angular/core';

export interface Utterance {
  text: string;
  lang: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private readonly synthesis?: SpeechSynthesis;
  private readonly utterance?: SpeechSynthesisUtterance;

  constructor() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.utterance = new SpeechSynthesisUtterance();
    }
  }

  public isAvailable(): boolean {
    return this.synthesis !== undefined;
  }

  public speak({ text, lang }: Utterance): void {
    if (this.isAvailable()) {
      this.synthesis!.cancel();
      this.utterance!.text = text;
      this.utterance!.lang = lang;
      this.synthesis!.speak(this.utterance!);
    }
  }

  public pause(): void {
    this.synthesis?.pause();
  }

  public resume(): void {
    this.synthesis?.resume();
  }
}
