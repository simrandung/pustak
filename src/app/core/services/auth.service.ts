import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }
  registerUser(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  checkEmailExists(email:string): Observable<boolean>{
    return this.http
    .get<{exists: boolean}>(`${this.baseUrl}/check-email?email=${email}`)
    .pipe(map(response => response.exists));
  }
  loginUser(credentials:any): Observable<any>{
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
