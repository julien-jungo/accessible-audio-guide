import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from "./views/hello-world/hello-world.component";
import { QrScannerComponent } from "./views/qr-scanner/qr-scanner.component";

const routes: Routes = [
  {
    path: '',
    component: HelloWorldComponent
  },
  {
    path: 'scan',
    component: QrScannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
