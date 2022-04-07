import { ShipmentCount } from './../interface/shipment';
import { Courier, Sender, Shipment } from '../interface/shipment';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  constructor(private _http: HttpClient) {}

  getShipments(
    page = '1',
    size = '10',
    uid?: string
  ): Observable<Shipment[]> {
    let httpParams = new HttpParams();
    if (page) {
      httpParams = httpParams.append('page', page);
    }
    if (size) {
      httpParams = httpParams.append('size', size);
    }
    if (uid) {
      httpParams = httpParams.append('uid', uid);
    }
    return this._http.get<Shipment[]>(`${environment.apiServerUrl}/shipment`, {
      params: httpParams,
    });
  }

  getShipment(id: string): Observable<Shipment> {
    return this._http.get<Shipment>(
      `${environment.apiServerUrl}/shipment/${id}`
    );
  }

  getShipmentHistory(id: string): Observable<any> {
    return this._http.get<any>(
      `${environment.apiServerUrl}/shipmenthistory/${id}`
    );
  }

  getShipmentCount(): Observable<ShipmentCount> {
    return this._http.get<ShipmentCount>(`${environment.apiServerUrl}/count`);
  }

  getCouriers(): Observable<Courier[]> {
    return this._http.get<Courier[]>(`${environment.apiServerUrl}/courier`);
  }

  getSenders(): Observable<Sender[]> {
    return this._http.get<Sender[]>(`${environment.apiServerUrl}/sender`);
  }

  getSender(id: string): Observable<Sender> {
    return this._http.get<Sender>(`${environment.apiServerUrl}/sender/${id}`);
  }

  addCourier(courier: Courier): Observable<Courier> {
    return this._http.post<Courier>(
      `${environment.apiServerUrl}/courier`,
      courier
    );
  }

  addSender(sender: Sender): Observable<Sender> {
    return this._http.post<Sender>(
      `${environment.apiServerUrl}/sender`,
      sender
    );
  }

  addShipment(shipment: Shipment): Observable<Shipment> {
    return this._http.post<Shipment>(
      `${environment.apiServerUrl}/shipment`,
      shipment
    );
  }

  updateShipment(shipment: Shipment, id: string): Observable<Shipment> {
    return this._http.put<Shipment>(
      `${environment.apiServerUrl}/shipment/${id}`,
      shipment
    );
  }
}
