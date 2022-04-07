import { DeliveryAttempts } from './../../core/interface/shipment';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CreateShipmentGroup {
  form: FormGroup;

  /**
   * @constructor
   * @param formBuilder
   */
  constructor(private formBuilder: FormBuilder) {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      shipmentDate: new FormControl(
        {
          value: new Date().toJSON().slice(0, 10),
          disabled: true,
        },
        Validators.required
      ),
      uid: new FormControl(null,Validators.required),
      shipmentPostage: new FormControl(null, Validators.required),
      shipmentWeight: new FormControl(300, Validators.required),
      senderId: new FormControl(null, Validators.required),
      senderFullName: new FormControl(),
      deliveryType: new FormControl('Од пошта до адреса', Validators.required),
      subjectOfShipment: new FormControl('', Validators.required),
      recommendedShipment: new FormControl(false),
      personalShipment: new FormControl(false),
      withReturnShipment: new FormControl(false),
      deliveryAttempts: this.formBuilder.array([]),
      recipient: this.formBuilder.group({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        phone: new FormControl(null),
        address: new FormControl(null, Validators.required),
        city: new FormControl(null, [Validators.required]),
        additionalInformation: new FormControl(''),
      }),
    });
  }

  addDeliveryAttempt(): FormGroup {
    return this.formBuilder.group({
      courierId: new FormControl(Validators.required),
      date: new FormControl(
        new Date().toISOString().slice(0, 10),
        Validators.required
      ),
      successfulDelivery: new FormControl(false),
      notFoundAtTheAddress: new FormControl(false),
      refuseToSign: new FormControl(false),
      refuseToAccept: new FormControl(false),
      incorrectAddress: new FormControl(false),
      givenNotice: new FormControl(false),
      deceased: new FormControl(false),
      evicted: new FormControl(false),
      illiterate: new FormControl(false),
      noPersonAtThatAddress: new FormControl(false),
      leftInWorkspace: new FormControl(false),
      recipientDidNotPickedUp: new FormControl(false),
      additionalInformation: new FormControl(''),
    });
  }

  patchDeliveryAttempt(form: DeliveryAttempts): FormGroup {
    return this.formBuilder.group({
      courierId: new FormControl(form.courierId, Validators.required),
      date: new FormControl(
        { value: form.date, disabled: true },
        Validators.required
      ),
      successfulDelivery: new FormControl(form.successfulDelivery),
      notFoundAtTheAddress: new FormControl(form.notFoundAtTheAddress),
      refuseToSign: new FormControl(form.refuseToSign),
      refuseToAccept: new FormControl(form.refuseToAccept),
      incorrectAddress: new FormControl(form.incorrectAddress),
      givenNotice: new FormControl(form.givenNotice),
      deceased: new FormControl(form.deceased),
      evicted: new FormControl(form.evicted),
      illiterate: new FormControl(form.illiterate),
      noPersonAtThatAddress: new FormControl(form.noPersonAtThatAddress),
      leftInWorkspace: new FormControl(form.leftInWorkspace),
      recipientDidNotPickedUp: new FormControl(form.recipientDidNotPickedUp),
      additionalInformation: new FormControl(form.additionalInformation),
    });
  }
}
