import { Component, HostBinding, OnInit,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  books:any[] = [];
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


  totalUsers = 0;
  totalBooks = 0;
  totalOrders = 0;
  topBooks: any[] = [];

  donutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  donutChartType: ChartType = 'doughnut';
  barChartType: ChartType = 'bar';

  isSidebarOpen = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getTopBooks().subscribe((books) => {
      this.topBooks = books;

      const labels = books.map((b: any) => b.title);
      const data = books.map((b: any) => b.quantity);

      this.donutChartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }
        ]
      };

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Quantity Sold',
            data: data,
            backgroundColor: '#4F46E5',
          }
        ]
      };
    });
     
  const theme = localStorage.getItem('hs_theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    this.isDarkMode = true;
  }

  this.loadBooks();
}

loadBooks() {
  this.adminService.getAllBooks().subscribe((data)=>{
    this.books = data
  })
}


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.querySelector('aside')?.classList.toggle('hidden');
  }

public topSellingBooks = [
    {title: 'Clean Code', quantitySold : 120},
    {title: 'Atomic Habits', quantitySold: 95},
    {title: 'Ikigai', quantitySold: 87},
    {title: 'The Secrets', quantitySold: 60},
    {title: 'The Alchemist', quantitySold: 57}
  ]

}
