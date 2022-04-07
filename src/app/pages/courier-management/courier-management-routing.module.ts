import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourierManagementComponent } from './courier-management.component';


const routes: Routes = [
  {
    path: '',
    component: CourierManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourierManagementRoutingModule {}