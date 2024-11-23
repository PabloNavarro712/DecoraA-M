import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAdminComponent } from './eventos-admin.component';

describe('EventosAdminComponent', () => {
  let component: EventosAdminComponent;
  let fixture: ComponentFixture<EventosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosAdminComponent]
    });
    fixture = TestBed.createComponent(EventosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
