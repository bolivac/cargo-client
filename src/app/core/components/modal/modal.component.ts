import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShipmentService } from '../../services/shipment.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() form: FormGroup;
  @Input() paramsId: string;

  constructor(
    public activeModal: NgbActiveModal,
    private shipmentService: ShipmentService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.paramsId) {
      this.shipmentService
        .updateShipment(this.form.getRawValue(), this.paramsId)
        .pipe(take(1))
        .subscribe({
          error(err) {
            alert('Грешка');
          },
          complete() {
            alert('Успешно');
          },
        });
    } else {
      this.shipmentService
        .addShipment(this.form.getRawValue())
        .pipe(take(1))
        .subscribe({
          error(err) {
            alert('Грешка');
          },
          complete() {
            alert('Успешно');
          },
        });
    }
    this.activeModal.close();
    this.router.navigate(['/dashboard']);
  }
}
