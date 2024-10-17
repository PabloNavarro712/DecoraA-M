import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdenesComponent } from './admin-ordenes.component';

describe('AdminOrdenesComponent', () => {
  let component: AdminOrdenesComponent;
  let fixture: ComponentFixture<AdminOrdenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdenesComponent]
    });
    fixture = TestBed.createComponent(AdminOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
