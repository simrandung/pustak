import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-book-slider',
  imports:[NgClass],
  templateUrl: './book-slider.component.html',
  styleUrls: ['./book-slider.component.css']
})
export class BookSliderComponent implements AfterViewInit {
  currentSlide = 0;
  books = [
    { title: 'The Book Thief', image: 'assets/books/atomic.jpg', bg: 'bg-gradient-to-r from-rose-400 to-pink-500' },
    { title: '1984', image: 'assets/books/ikigai.jpg', bg: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
    { title: 'Sapiens', image: 'assets/books/alchemist.jpg', bg: 'bg-gradient-to-r from-green-400 to-blue-500' }
  ];

  ngAfterViewInit() {
    gsap.from('.slide', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.3
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.books.length;
    gsap.from('.slide', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.books.length) % this.books.length;
    gsap.from('.slide', {
      opacity: 0,
      y: -100,
      duration: 1,
      ease: 'power3.out'
    });
  }
}

