import { Injectable } from '@angular/core';
import QrScanner from "qr-scanner";

export interface ScanConfig {
  element: HTMLVideoElement;
  onResult: (result: string) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor() {}

  public scan({ element, onResult }: ScanConfig) {
    const scanner = new QrScanner(
      element,
      result => {
        onResult(result.data);
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

    void scanner.start();
  }
}
