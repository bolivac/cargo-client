import { AuthenticateResponse } from './../../core/interface/shipment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      username: '',
      password: '',
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((res: AuthenticateResponse) => {
        if (res.success) {
          this.authService.storeUserData(res.token, res.user)
        } else {
          alert(res.msg);
        }
      });
      this.form.reset();
    }
  }
}
