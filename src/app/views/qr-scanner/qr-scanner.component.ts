import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ScannerService } from "../../services/scanner.service";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit, OnDestroy {

  @ViewChild('video')
  private video?: ElementRef;

  public ready: boolean = false;

  private destroyScanner?: () => void;

  constructor(private readonly scannerService: ScannerService) {}

  ngAfterViewInit() {
    this.scannerService.scan({
      element: this.video!.nativeElement,
      onResult: (result, destroy) => {
        this.destroyScanner = destroy;
        if (this.ready && result !== '') {
          const url = new URL(result);
          location.href = '/reader'
            + url.search
            + url.hash;
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

  ngOnDestroy() {
    if (this.destroyScanner) {
      this.destroyScanner();
    }
  }
}
