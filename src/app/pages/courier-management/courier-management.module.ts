import { CourierManagementComponent } from './courier-management.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourierManagementRoutingModule } from './courier-management-routing.module';

@NgModule({
  declarations: [CourierManagementComponent],
  imports: [
    CommonModule,
    CourierManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CourierManagementModule {}
