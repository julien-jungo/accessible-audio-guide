import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ScannerService } from "../../services/scanner-service";

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit {

  @ViewChild('video')
  private video?: ElementRef;

  constructor(private readonly scannerService: ScannerService) {}

  ngAfterViewInit() {
    this.scannerService.scan({
      element: this.video!.nativeElement,
      onResult: result => console.log(result)
    });
  }
}
