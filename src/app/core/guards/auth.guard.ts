import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import {
  Router,
  CanActivate,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.isLoggedIn.pipe(
      tap((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true
      })
    );
  }
}
