import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any>{
    return this.http.get(`${this.baseUrl}/books`);
  }

  addBook(book:any): Observable<any>{
   return this.http.post(`${this.baseUrl}/books`,book);
  }

  deleteBook(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/books/${id}`);
  }
  updateBook(id:string,book:any){
    return this.http.put(`${this.baseUrl}/books/${id}`,book);
  }
  // getAllUsers(): Observable<any>{
  //   return this.http.get(`${this.baseUrl}/users`);
  // }
}
