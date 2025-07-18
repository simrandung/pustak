import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from 'src/app/core/services/book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit{
  books: any[] = [];
  users: any[] =[];
  newBook= {book_id:'',title:'',author:'',price: '', cover_image:''}
  //editingBook: any = null;

  isDarkMode = false
 toggleDarkMode() {
  const html = document.documentElement;
  this.isDarkMode = html.classList.contains('dark');

  if (this.isDarkMode) {
    html.classList.remove('dark');
    localStorage.setItem('hs_theme', 'light');
    this.isDarkMode = false;
  } else {
    html.classList.add('dark');
    localStorage.setItem('hs_theme', 'dark');
    this.isDarkMode = true;
  }
}

  constructor(private bookService: BookService){
    
  }
  ngOnInit(): void {
    this.loadBooks();

    const theme = localStorage.getItem('hs_theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    this.isDarkMode = true;
  }
    
  }

  loadBooks(){
    this.bookService.getAllBooks().subscribe((data)=>{
      this.books = data;

    })
  }

  addBook(){
    const token = localStorage.getItem('role');
    console.log(token);
    
    this.bookService.addBook(this.newBook).subscribe(()=> {
      this.newBook ={book_id:'', title:'',author:'',price:'',cover_image:''};
      this.loadBooks();
    })
  }

  deleteBook(id:string){
    this.bookService.deleteBook(id).subscribe(()=>
      this.loadBooks());
  }
  // loadUsers(){
  //   this.bookService.getAllUsers().subscribe((data)=>{
  //     this.users = data;

  //   })
  // }



}
