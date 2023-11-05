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
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeIconComponent } from './components/icons/home-icon/home-icon.component';
import { InfoIconComponent } from './components/icons/info-icon/info-icon.component';
import { QrIconComponent } from './components/icons/qr-icon/qr-icon.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
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
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    HomeIconComponent,
    InfoIconComponent,
    QrIconComponent
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
