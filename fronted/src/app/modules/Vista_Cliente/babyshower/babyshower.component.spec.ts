import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyshowerComponent } from './babyshower.component';

describe('BabyshowerComponent', () => {
  let component: BabyshowerComponent;
  let fixture: ComponentFixture<BabyshowerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BabyshowerComponent]
    });
    fixture = TestBed.createComponent(BabyshowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
