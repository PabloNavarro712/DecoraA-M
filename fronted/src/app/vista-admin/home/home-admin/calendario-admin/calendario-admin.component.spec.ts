import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAdminComponent } from './calendario-admin.component';

describe('CalendarioAdminComponent', () => {
  let component: CalendarioAdminComponent;
  let fixture: ComponentFixture<CalendarioAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioAdminComponent]
    });
    fixture = TestBed.createComponent(CalendarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
