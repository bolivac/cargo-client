import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateShipmentGroup } from './create-shipment.group';
import { CreateShipmentComponent } from './create-shipment.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateShipmentRoutingModule } from './create-shipment-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  declarations: [CreateShipmentComponent],
  imports: [
    CommonModule,
    CreateShipmentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    Ng2FlatpickrModule,
  ],
  providers: [CreateShipmentGroup, DatePipe],
})
export class CreateShipmentModule {}
