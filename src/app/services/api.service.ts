import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  postWeekPlan(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/plan/week`, data);
  }

  getShoppingList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/shopping/list/1`);
  }
}
