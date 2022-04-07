import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const isApiUrl = request.url.startsWith(environment.apiServerUrl);
    this.authService.isLoggedIn
      .pipe(
        map((isLoggedIn: boolean) => {
          if (isLoggedIn && isApiUrl) {
            request = request.clone({
              setHeaders: {
                Authorization: localStorage.getItem('id_token'),
              },
            });
          }
        })
      )
      .subscribe();

    return next.handle(request);
  }
}
