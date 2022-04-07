import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenderManagementComponent } from './sender-management.component';
import { SenderManagementRoutingModule } from './sender-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SenderManagementComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SenderManagementRoutingModule,
    FormsModule,
  ],
})
export class SenderManagementModule {}
