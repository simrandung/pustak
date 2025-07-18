import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any>{
    return this.http.get(`${this.BASE_URL}/books`);
  }

  addToWishlist(book:any):Observable<any>{
    return this.http.post(`${this.BASE_URL}/wishlist/add`,book);
  }
  addToCart(book:any): Observable<any>{
    return this.http.post(`${this.BASE_URL}/cart/add`,book);
  }

}
