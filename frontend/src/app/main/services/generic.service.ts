import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BaseResponse } from '../models/base_response.model';
import { Observable } from 'rxjs';
@Injectable()
export class GenericService {

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };

    constructor(private httpClient: HttpClient) {
    }

    updateEntity(type: String, entity: {}): Observable<BaseResponse> {
        const data = { type: type, entity: entity }
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis.updateEntity, data, this.httpOptions);
    }
}