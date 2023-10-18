import { ErrorHandler, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class MyErrorHandler implements ErrorHandler {

  constructor(private readonly router: Router) {}

  public handleError(error: Error) {
    void this.router.navigateByUrl('/error');
  }
}
