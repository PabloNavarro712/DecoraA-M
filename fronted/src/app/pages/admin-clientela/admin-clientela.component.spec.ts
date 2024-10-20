import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientelaComponent } from './admin-clientela.component';

describe('AdminClientelaComponent', () => {
  let component: AdminClientelaComponent;
  let fixture: ComponentFixture<AdminClientelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientelaComponent]
    });
    fixture = TestBed.createComponent(AdminClientelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
