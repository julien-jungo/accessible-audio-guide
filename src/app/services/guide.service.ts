import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { ContentService } from "./content.service";

@Injectable({
  providedIn: 'root'
})
export class GuideService {

  private url?: string;

  constructor(private readonly contentService: ContentService) {}

  public target(url: string): void {
    this.url = url;
  }

  public observe(): Observable<string | undefined> {
    return (this.url) ? this.contentService.request(this.url) : of(undefined);
  }
}
