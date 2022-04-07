import { ShipmentService } from 'src/app/core/services/shipment.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Courier } from 'src/app/core/interface/shipment';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private _couriers = new BehaviorSubject<Courier[]>([]);

  public readonly couriers$ = this._couriers.asObservable();

  get couriers(): Courier[] {
    return this._couriers.getValue();
  }

  set couriers(couriers: Courier[]) {
    this._couriers.next(couriers);
  }

}
