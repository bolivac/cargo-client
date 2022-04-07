import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Shipment } from 'src/app/core/interface/shipment';
import { ShipmentService } from 'src/app/core/services/shipment.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent  {
  shipments$: Observable<Shipment[]> = this.service.getShipments()
  page = 1;

  constructor(private service: ShipmentService) {}

  loadPage(page: number): void {
    this.shipments$ = this.service.getShipments(page.toString());
  }
}
