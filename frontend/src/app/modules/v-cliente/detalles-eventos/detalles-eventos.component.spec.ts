import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEventosComponent } from './detalles-eventos.component';

describe('DetallesEventosComponent', () => {
  let component: DetallesEventosComponent;
  let fixture: ComponentFixture<DetallesEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesEventosComponent]
    });
    fixture = TestBed.createComponent(DetallesEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
