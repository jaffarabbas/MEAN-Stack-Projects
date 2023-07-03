import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ApiService <T> implements OnInit{
  apiUrl!: string;
  apiController!: string;
  ngOnInit(): void {
  }

  private _refreshApi = new Subject<void>();

  protected constructor(protected http: HttpClient) {

  }

  get refreshApi() {
    return this._refreshApi;
  }

  get apiUrlWithController(): string {
    return this.apiUrl + this.apiController + "/";
  }

  private getHeaders(token:any): HttpHeaders {
    // Replace with your actual bearer token
    console.log(token);
    return new HttpHeaders().set('Authorization', `Bearer ${JSON.parse(token)}`);
  }

  getAll(endPoint:string): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrlWithController+endPoint);
  }

  getOne(endPoint:string): Observable<T> {
    return this.http.get<T>(this.apiUrlWithController+endPoint);
  }

  getAllById(id:any,endPoint:string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrlWithController+endPoint}/${id}`);
  }

  getById(id: any,endPoint:string): Observable<T> {
    return this.http.get<T>(`${this.apiUrlWithController+endPoint}/${id}`);
  }

  create(item: T,endPoint:string): Observable<T> {
    return this.http.post<T>(this.apiUrlWithController+endPoint, item).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  update(value: T,id:any,endPoint:string): Observable<T> {
    return this.http.put<T>(`${this.apiUrlWithController+endPoint}/${id}`, value).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  updateByData(value: T,endPoint:string): Observable<T> {
    return this.http.put<T>(this.apiUrlWithController+endPoint, value).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  remove(value: T,id:any,endPoint:string): Observable<T> {
    return this.http.put<T>(`${this.apiUrlWithController+endPoint}/${id}`, value);
  }

  delete(id: number,endPoint:string): Observable<any> {
    return this.http.delete(`${this.apiUrlWithController+endPoint}/${id}`).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  _getAll(endPoint: string,token:any): Observable<T[]> {
    const headerData = this.getHeaders(token);
    return this.http.get<T[]>(this.apiUrlWithController + endPoint, { headers: headerData });
  }

  _getOne(endPoint: string,token:any): Observable<T> {
    console.log("token",token);
    const headerData = this.getHeaders(token);
    console.log("headerData",headerData);
    return this.http.get<T>(this.apiUrlWithController + endPoint, { headers: headerData });
  }

  _getAllById(id: any, endPoint: string,token:any): Observable<T[]> {
    const headerData = this.getHeaders(token);
    return this.http.get<T[]>(`${this.apiUrlWithController + endPoint}/${id}`, { headers: headerData });
  }

  _getById(id: any, endPoint: string,token:any): Observable<T> {
    const headerData = this.getHeaders(token);
    return this.http.get<T>(`${this.apiUrlWithController + endPoint}/${id}`, { headers: headerData });
  }

  _create(item: T, endPoint: string,token:any): Observable<T> {
    const headerData = this.getHeaders(token);
    return this.http.post<T>(this.apiUrlWithController + endPoint, item, { headers: headerData }).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  _update(value: T, id: any, endPoint: string,token:any): Observable<T> {
    const headerData = this.getHeaders(token);
    return this.http.put<T>(`${this.apiUrlWithController + endPoint}/${id}`, value, { headers: headerData }).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  _updateByData(value: T, endPoint: string,token:any): Observable<T> {
    const headerData = this.getHeaders(token);
    return this.http.put<T>(this.apiUrlWithController + endPoint, value, { headers: headerData }).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  _remove(value: T, id: any, endPoint: string,token:any): Observable<T> {
    const headerData = this.getHeaders(token);
    return this.http.put<T>(`${this.apiUrlWithController + endPoint}/${id}`, value, { headers: headerData });
  }

  _delete(id: number, endPoint: string,token:any): Observable<any> {
    const headerData = this.getHeaders(token);
    return this.http.delete(`${this.apiUrlWithController + endPoint}/${id}`, { headers: headerData }).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }
}
