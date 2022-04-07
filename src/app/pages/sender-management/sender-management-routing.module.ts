import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SenderManagementComponent } from './sender-management.component';

const routes: Routes = [
  {
    path: '',
    component: SenderManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenderManagementRoutingModule {}
