import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  register(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: URLSearchParams): Observable<any> {
    const headers = { 'Content-Type' : 'application/x-www-form-urlencoded'};
    return this.http.post(`${this.baseUrl}/login`,data.toString(),{ headers })
  }

 
}
