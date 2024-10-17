import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSalpicaderoComponent } from './admin-salpicadero.component';

describe('AdminSalpicaderoComponent', () => {
  let component: AdminSalpicaderoComponent;
  let fixture: ComponentFixture<AdminSalpicaderoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSalpicaderoComponent]
    });
    fixture = TestBed.createComponent(AdminSalpicaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
