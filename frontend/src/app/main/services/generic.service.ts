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

    retrieveEntitybyID(type: string, entityID: string): Observable<{}> {
        let params = new HttpParams().set('entity', type).set('entityID', entityID);
        return this.httpClient.get<{}>(environment.apis.baseUrl + environment.apis.retrieveEntitybyID, { headers: this.httpOptions.headers, params: params });
    }

    retrieveQuotasbyYearandMonth(year: number, month: number): Observable<{}> {
        let params = new HttpParams().set('year', JSON.stringify(year)).set('month', JSON.stringify(month));
        return this.httpClient.get<{}>(environment.apis.baseUrl + environment.apis.retrieveQuotasbyYearandMonth, { headers: this.httpOptions.headers, params: params });
    }
    
    retrieveSalesbyDate(year: number, month: number, day: number): Observable<{}> {
        let params = new HttpParams().set('year', JSON.stringify(year)).set('month', JSON.stringify(month)).set('day', JSON.stringify(day));
        return this.httpClient.get<{}>(environment.apis.baseUrl + environment.apis.retrieveSalesbyDate, { headers: this.httpOptions.headers, params: params });
    }

    retrieveExistingsbyDate(year: number, month: number, day: number): Observable<{}> {
        let params = new HttpParams().set('year', JSON.stringify(year)).set('month', JSON.stringify(month)).set('day', JSON.stringify(day));
        return this.httpClient.get<{}>(environment.apis.baseUrl + environment.apis.retrieveExistingsbyDate, { headers: this.httpOptions.headers, params: params });
    }

    retrieveTripsbyDate(year: number, month: number, day: number): Observable<{}> {
        let params = new HttpParams().set('year', JSON.stringify(year)).set('month', JSON.stringify(month)).set('day', JSON.stringify(day));
        return this.httpClient.get<{}>(environment.apis.baseUrl + environment.apis.retrieveTripsbyDate, { headers: this.httpOptions.headers, params: params });
    }
}