import { AuthService } from '../services/auth.service';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      tap((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
          return true;
        }
        return false
      })
    );
  }
}
