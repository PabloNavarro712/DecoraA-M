import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonagregarComponent } from './botonagregar.component';

describe('BotonagregarComponent', () => {
  let component: BotonagregarComponent;
  let fixture: ComponentFixture<BotonagregarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotonagregarComponent]
    });
    fixture = TestBed.createComponent(BotonagregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
