import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStorageService } from 'app/main/services/app-storage.service';
import { environment } from 'environments/environment';
import { BaseResponse } from '../models/base_response.model';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';
@Injectable()
export class DriverService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient, private appStorageService: AppStorageService) {
    }

    createDriver(driver: {}): Observable<BaseResponse> {
        const data = driver
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis.createDriver, data, this.httpOptions);

    }

    retrieveDrivers(): Observable<Driver[]> {
        return this.httpClient.get<Driver[]>(environment.apis.baseUrl + environment.apis.retrieveDrivers, this.httpOptions);
    }
}