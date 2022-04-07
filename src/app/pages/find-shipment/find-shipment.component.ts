import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from 'src/app/core/interface/shipment';
import { ShipmentService } from 'src/app/core/services/shipment.service';

@Component({
  selector: 'app-find-shipment',
  templateUrl: './find-shipment.component.html',
  styleUrls: ['./find-shipment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindShipmentComponent {
  shipments$: Observable<Shipment[]>;
  constructor(private service: ShipmentService) {}

  findShipment(uid: string): void {
    this.shipments$ = this.service.getShipments(null, null, uid);
  }
}
