import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Shipment } from 'src/app/core/interface/shipment';


@Component({
  selector: 'app-shipment-card',
  templateUrl: './shipment-card.component.html',
  styleUrls: ['./shipment-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipmentCardComponent {
  @Input() shipment: Shipment;

}
