import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrScannerComponent } from "./views/qr-scanner/qr-scanner.component";
import { ReaderComponent } from "./views/reader/reader.component";
import { ErrorComponent } from "./views/error/error.component";
import { preloadResolver } from "./resolvers/preload.resolver";

const routes: Routes = [
  {
    path: '',
    component: QrScannerComponent
  },
  {
    path: 'reader',
    component: ReaderComponent,
    resolve: { guide: preloadResolver }
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
