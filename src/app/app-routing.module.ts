import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const loginModule = async () =>
  await import('./pages/login/login.module').then((x) => x.LoginModule);

const dashboardModule = async () =>
  await import('./pages/dashboard/dashboard.module').then(
    (x) => x.DashboardModule
  );
const findShipmentModule = async () =>
  await import('./pages/find-shipment/find-shipment.module').then(
    (x) => x.FindShipmentModule
  );
const senderManagementModule = async () =>
  await import('./pages/sender-management/sender-management.module').then(
    (x) => x.SenderManagementModule
  );
const createShipmentModule = async () =>
  await import('./pages/create-shipment/create-shipment.module').then(
    (x) => x.CreateShipmentModule
  );

const courierManagementModule = async () =>
  await import('./pages/courier-management/courier-management.module').then(
    (x) => x.CourierManagementModule
  );

const routes: Routes = [
  { path: 'login', loadChildren: loginModule },
  {
    path: 'dashboard',
    loadChildren: dashboardModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'shipment',
    loadChildren: createShipmentModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'find-shipment',
    loadChildren: findShipmentModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'courier-management',
    loadChildren: courierManagementModule,
    canActivate: [AuthGuard],
  },
  {
    path: 'sender-management',
    loadChildren: senderManagementModule,
    canActivate: [AuthGuard],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
