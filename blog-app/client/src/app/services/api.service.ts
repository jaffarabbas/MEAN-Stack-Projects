import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService <T> implements OnInit{
  apiUrl!: string;
  apiController!: string;
  ngOnInit(): void {
  }

  private _refreshApi = new Subject<void>();

  get refreshApi() {
    return this._refreshApi;
  }
  get apiUrlWithController(): string {
    return this.apiUrl + this.apiController + "/";
  }

  protected constructor(protected http: HttpClient) {}

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
}
