import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScannerService } from "../../services/scanner.service";
import { ContentService } from "../../services/content.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit {

  @ViewChild('video')
  private video?: ElementRef;

  public ready: boolean = false;

  constructor(
    private readonly scannerService: ScannerService,
    private readonly contentService: ContentService,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    this.scannerService.scan({
      element: this.video!.nativeElement,
      onResult: (result, destroy) => {
        if (this.ready && result !== '') {
          const url = new URL(result);
          // @ts-ignore - see https://shorturl.at/fmJV5
          const queryParams = Object.fromEntries(url.searchParams);

          this.router
            .navigate(['/reader'], { queryParams })
            .finally(destroy);
        }
      },
      onStartup: () => {
        // prevent camera glitches
        setTimeout(() => {
          this.ready = true;
        }, 500);
      }
    });
  }
}
