import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './views/hello-world/hello-world.component';
import { QrScannerComponent } from './views/qr-scanner/qr-scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    QrScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
