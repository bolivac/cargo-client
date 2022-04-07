import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CourierService } from 'src/app/core/services/courier.service';
import { SenderService } from './core/services/sender.service';
import { ShipmentService } from 'src/app/core/services/shipment.service';
import { take } from 'rxjs/internal/operators/take';
import { Courier, Sender } from './core/interface/shipment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private courierService: CourierService,
    private senderService: SenderService,
    private service: ShipmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((authenticated: boolean) => {
      if (authenticated) {
        this.initCourierState();
        this.initSenderState();
      }
    })
  }

  initCourierState(): void {
    this.service
    .getCouriers()
    .pipe(take(1))
    .subscribe((c: Courier[]) => (this.courierService.couriers = c));
  }
  initSenderState(): void {
    this.service
    .getSenders()
    .pipe(take(1))
    .subscribe((s: Sender[]) => (this.senderService.senders = s));
  }
}
