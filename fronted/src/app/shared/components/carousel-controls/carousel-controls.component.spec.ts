import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselControlsComponent } from './carousel-controls.component';

describe('CarouselControlsComponent', () => {
  let component: CarouselControlsComponent;
  let fixture: ComponentFixture<CarouselControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselControlsComponent]
    });
    fixture = TestBed.createComponent(CarouselControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
