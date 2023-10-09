import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrScannerComponent } from "./views/qr-scanner/qr-scanner.component";
import { ReaderComponent } from "./views/reader/reader.component";

const routes: Routes = [
  {
    path: '',
    component: QrScannerComponent
  },
  {
    path: 'reader',
    component: ReaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
