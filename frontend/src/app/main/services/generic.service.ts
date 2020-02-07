import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    createEntity(type: String, entity: {}): Observable<BaseResponse> {
        const data = { type: type, entity: entity }
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis.createEntity, data, this.httpOptions);
    }
    
    updateEntity(type: String, entity: {}): Observable<BaseResponse> {
        return this.httpClient.post<BaseResponse>(environment.apis.baseUrl + environment.apis[`update${type}`], entity, this.httpOptions);
    }
    
    retrieveAllEntities(entity: string): Observable<[]> {
        let params = new HttpParams().set('entity', entity);
        return this.httpClient.get<[]>(environment.apis.baseUrl + environment.apis.retrieveAllEntities, { headers: this.httpOptions.headers, params: params });
    }

    retrieveShownEntities(entity: string): Observable<[]> {
        let params = new HttpParams().set('entity', entity);
        return this.httpClient.get<[]>(environment.apis.baseUrl + environment.apis.retrieveShownEntities, { headers: this.httpOptions.headers, params: params });
    }

}