import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  books: any[] =[];
  constructor(private userService:UserService){}
  
  ngOnInit(): void {
    this.userService.getAllBooks().subscribe((res)=> {
      console.log(res);
      
      this.books = res.books || res;
    })
  }

  addToWishlist(book:any){
    console.log(book);
    
    this.userService.addToWishlist(book).subscribe(()=>{      
      alert(`${book.title} added to wishlist`)
    })
  }

  addToCart(book:any){
    this.userService.addToCart(book).subscribe(()=>{
      alert(`${book.title} added to cart`)
    })
  }
}
