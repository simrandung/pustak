import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSliderComponent } from './book-slider.component';

describe('BookSliderComponent', () => {
  let component: BookSliderComponent;
  let fixture: ComponentFixture<BookSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookSliderComponent]
    });
    fixture = TestBed.createComponent(BookSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
