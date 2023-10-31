import * as Hammer from 'hammerjs';

import {
  BrowserModule,
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

import { NgModule, isDevMode, importProvidersFrom, Injectable, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrScannerComponent } from './views/qr-scanner/qr-scanner.component';
import { ReaderComponent } from './views/reader/reader.component';
import { ErrorComponent } from './views/error/error.component';
import { MyErrorHandler } from "./handlers/my-error-handler";
import { ContainerComponent } from './components/container/container.component';
import { QrButtonComponent } from './components/qr-button/qr-button.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
    // necessary for vertical scrolling
    // see https://shorturl.at/qvzPW
    pinch: { enable: false },
    rotate: { enable: false },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent,
    ReaderComponent,
    ErrorComponent,
    ContainerComponent,
    QrButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    importProvidersFrom(HammerModule),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
