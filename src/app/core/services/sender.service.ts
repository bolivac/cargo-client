import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Sender } from '../interface/shipment';
@Injectable({
  providedIn: 'root',
})
export class SenderService {
  private _senders = new BehaviorSubject<Sender[]>([]);

  public readonly senders$ = this._senders.asObservable();

  get senders(): Sender[] {
    return this._senders.getValue();
  }

  set senders(senders: Sender[]) {
    this._senders.next(senders);
  }

}
