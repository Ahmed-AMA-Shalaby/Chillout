import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BaseResponse } from '../models/base_response.model';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
@Injectable()
export class VehicleService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    createVehicle(vehicle: {}): Observable<BaseResponse> {
        const data = vehicle
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis.createVehicle, data, this.httpOptions);
    }

    retrieveVehicles(): Observable<Vehicle[]> {
        return this.httpClient.get<Vehicle[]>(environment.apis.baseUrl + environment.apis.retrieveVehicles, this.httpOptions);
    }

    updateEntity(entity): Observable<BaseResponse> {
        const data = entity
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis.updateEntity, data, this.httpOptions);
    }
}