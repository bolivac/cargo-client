import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Courier } from 'src/app/core/interface/shipment';
import { CourierService } from 'src/app/core/services/courier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { ShipmentService } from 'src/app/core/services/shipment.service';

@Component({
  selector: 'app-courier-management',
  templateUrl: './courier-management.component.html',
  styleUrls: ['./courier-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourierManagementComponent {
  couriers$: Observable<Courier[] | null> = this.courierService.couriers$;

  courierForm: FormGroup;

  constructor(
    private service: ShipmentService,
    private fb: FormBuilder,
    private courierService: CourierService
  ) {
    this.courierForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  onSubmit(): void {
    this.service.addCourier(this.courierForm.value).subscribe(() => {
      this.courierForm.reset();
      this.couriers$ = this.service.getCouriers();
    });
  }
}
