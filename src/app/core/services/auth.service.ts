import { AuthenticateResponse, AuthenticatePayload } from './../interface/shipment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private _http: HttpClient) {
    if (localStorage.getItem('user')) {
      this.loggedIn.next(true)
    }
  }

  login(user: AuthenticatePayload): Observable<AuthenticateResponse> {
    return this._http
      .post(`${environment.apiServerUrl}/auth/authenticate`, user)
      .pipe(
        take(1),
        tap((res: AuthenticateResponse) => {
          if (res.success) {
            this.loggedIn.next(true);
            this.router.navigate(['/dashboard']);
          }
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  storeUserData(token, user): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
