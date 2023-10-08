import { Injectable } from '@angular/core';
import QrScanner from "qr-scanner";

export interface ScanConfig {
  element: HTMLVideoElement;
  onStartup: () => void;
  onResult: (result: string, destroy: () => void) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor() {}

  public scan({ element, onResult, onStartup }: ScanConfig) {
    const scanner = new QrScanner(
      element,
      result => {
        onResult(
          result.data,
          () => scanner.destroy()
        );
      },
      {
        calculateScanRegion: video => {
          return {
            width: video.videoWidth,
            height: video.videoHeight
          }
        }
      }
    );

    scanner.start().then(onStartup);
  }
}
