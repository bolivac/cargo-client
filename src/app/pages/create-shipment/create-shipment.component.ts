import Macedonian from 'flatpickr/dist/l10n/mk.js';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
  } from '@angular/core';
import { CheckHistoryModalComponent } from 'src/app/core/components/check-history-modal/check-history-modal.component';
import { Courier, Sender, Shipment } from 'src/app/core/interface/shipment';
import { CourierService } from 'src/app/core/services/courier.service';
import { CreateShipmentGroup } from './create-shipment.group';
import { DatePipe } from '@angular/common';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormArray, FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { OnDestroy } from '@angular/core';
import { SenderService } from './../../core/services/sender.service';
import { ShipmentService } from 'src/app/core/services/shipment.service';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateShipmentComponent implements OnInit, OnDestroy {
  private _uuid = new BehaviorSubject<string>('');
  readonly uuid$ = this._uuid.asObservable();

  @ViewChild('shipmentDate') shipmentDate;
  couriers$: Observable<Courier[]> = this.courierService.couriers$;
  form: FormGroup;
  senders$: Observable<Sender[]> = this.senderService.senders$;
  shipment$: Observable<Shipment>;
  shipmentHistory$: Observable<any>;
  paramsId = '';

  configureDate: FlatpickrOptions = {
    altInput: true,
    altInputClass: 'form-control',
    altFormat: 'Y-m-d',
    locale: Macedonian.mk,
    dateFormat: 'Y-m-d',
    time_24hr: true,
  };

  get deliveryAttempts(): FormArray {
    return this.form.get('deliveryAttempts') as FormArray;
  }

  get recipient(): FormGroup {
    return this.form.get('recipient') as FormGroup;
  }

  constructor(
    private createShipmentGroup: CreateShipmentGroup,
    private shipmentService: ShipmentService,
    private courierService: CourierService,
    private senderService: SenderService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    this.form = this.createShipmentGroup.form;
    this.deliveryAttempts.push(this.createShipmentGroup.addDeliveryAttempt());
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.paramsId = params.id;
        this.shipmentService
          .getShipment(params.id)
          .pipe(take(1))
          .subscribe((res) => {
            res.shipmentDate = this.datePipe.transform(
              res.shipmentDate,
              'Y-M-d'
            );
            this.deliveryAttempts.clear();
            this.form.patchValue(res);
            this._uuid.next(this.form.get('uid').value)
            res.deliveryAttempts.forEach((deliveryAttempt) => {
              deliveryAttempt.date = this.datePipe.transform(
                deliveryAttempt.date,
                'Y-M-d'
              );
              this.deliveryAttempts.push(
                this.createShipmentGroup.patchDeliveryAttempt(deliveryAttempt)
              );
            });
          });
        this.shipmentHistory$ = this.shipmentService.getShipmentHistory(
          params.id
        );
      } else {
        this.deliveryAttempts.clear();
        this.form.reset();
        this.form = this.createShipmentGroup.initForm();
        this.shipmentService
          .getShipmentCount()
          .pipe(
            take(1)
          )
          .subscribe((totalShipmentCount) => {
            this.form.get('uid').patchValue(totalShipmentCount.count + 1);
            this._uuid.next(this.form.get('uid').value) 
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.deliveryAttempts.clear();
    this.form.reset();
  }

  addDeliveryAttempt(): void {
    this.deliveryAttempts.push(this.createShipmentGroup.addDeliveryAttempt());
  }

  onSubmit(): void {
    if (this.form.valid) {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.form = this.form;
      modalRef.componentInstance.paramsId = this.paramsId;
    } else {
      this.form.markAllAsTouched();
    }
  }

  checkHistory(): void {
    const modalRef = this.modalService.open(CheckHistoryModalComponent);
    modalRef.componentInstance.shipmentHistory = this.shipmentHistory$;
    modalRef.componentInstance.uid = this.form.get('uid').value;
  }

  onSelectSender(target: any): void {
    if (target) {
      this.shipmentService.getSender(target).subscribe((sender) => {
        this.form
          .get('senderFullName')
          .setValue(sender.firstName + ' ' + sender.lastName);
      });
    }
  }
}
