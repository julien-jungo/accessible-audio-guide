import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private synthesis?: SpeechSynthesis;

  private readonly available: boolean = false;

  constructor() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
      this.available = true;
    }
  }

  isAvailable() {
    return this.available;
  }

  speak(text: string) {
    if (this.isAvailable()) {
      const utterance = new SpeechSynthesisUtterance(text);
      this.synthesis?.speak(utterance);
    } else {
      throw new Error();
    }
  }
}
