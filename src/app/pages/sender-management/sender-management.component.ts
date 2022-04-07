import { SenderService } from './../../core/services/sender.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Sender } from 'src/app/core/interface/shipment';
import { ShipmentService } from 'src/app/core/services/shipment.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sender-management',
  templateUrl: './sender-management.component.html',
  styleUrls: ['./sender-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SenderManagementComponent {
  senders$: Observable<Sender[] | null> = this.senderService.senders$;

  senderForm: FormGroup;

  constructor(
    private service: ShipmentService,
    private fb: FormBuilder,
    private senderService: SenderService
  ) {
    this.senderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      embs: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  onSubmit(): void {
    this.service.addSender(this.senderForm.value)
    .pipe(take(1))
    .subscribe(() => {
      this.senderForm.reset();
      this.senders$ = this.service.getSenders();
    });
  }
}
