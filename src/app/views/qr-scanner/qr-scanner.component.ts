import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScannerService } from "../../services/scanner.service";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit {

  @ViewChild('video')
  private video?: ElementRef;

  public ready: boolean = false;

  constructor(private readonly scannerService: ScannerService) {}

  ngAfterViewInit() {
    this.scannerService.scan({
      element: this.video!.nativeElement,
      onResult: (result, destroy) => {
        if (this.ready && result !== '') {
          const url = new URL(result);
          location.href = '/reader'
            + url.search
            + url.hash;
          destroy();
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
