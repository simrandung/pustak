import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

 
  getTopBooks():Observable<any>{
    return this.http.get(`${this.baseUrl}/top-books`);
  }

  getAllBooks():Observable<any>{
    return this.http.get(`${this.baseUrl}/books`);
  }
}
