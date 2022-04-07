import { ShipmentCardModule } from './../dashboard/shipment-card/shipment-card.module';
import { FindShipmentComponent } from './find-shipment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindSHipmentRoutingModule } from './find-shipment-routing.module';

@NgModule({
  declarations: [FindShipmentComponent],
  imports: [CommonModule, FindSHipmentRoutingModule, ShipmentCardModule],
})
export class FindShipmentModule {}
