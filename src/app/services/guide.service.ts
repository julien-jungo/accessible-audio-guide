import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  private guide?: string;

  constructor() {}

  public setGuide(guide: string): void {
    this.guide = guide;
  }

  public getGuide(): string | undefined {
    return this.guide;
  }
}
