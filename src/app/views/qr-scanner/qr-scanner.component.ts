import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScannerService } from "../../services/scanner.service";
import { GuideService } from "../../services/guide.service";
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
    private readonly guideService: GuideService,
    private readonly router: Router
  ) {}

  ngAfterViewInit() {
    this.scannerService.scan({
      element: this.video!.nativeElement,
      onResult: (result, destroy) => {
        if (this.ready && result !== '') {
          this.guideService.setGuide(result);
          this.router.navigateByUrl('reader').then(destroy);
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
