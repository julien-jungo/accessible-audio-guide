import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QrScannerComponent } from './views/qr-scanner/qr-scanner.component';
import { ReaderComponent } from './views/reader/reader.component';

@NgModule({
  declarations: [
    AppComponent,
    QrScannerComponent,
    ReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
