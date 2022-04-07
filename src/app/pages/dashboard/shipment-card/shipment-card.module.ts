import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentCardComponent } from './shipment-card.component';

@NgModule({
  declarations: [ShipmentCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [ShipmentCardComponent],
})
export class ShipmentCardModule {}
