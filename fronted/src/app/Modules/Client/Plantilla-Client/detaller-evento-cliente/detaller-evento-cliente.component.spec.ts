import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallerEventoClienteComponent } from './detaller-evento-cliente.component';

describe('DetallerEventoClienteComponent', () => {
  let component: DetallerEventoClienteComponent;
  let fixture: ComponentFixture<DetallerEventoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallerEventoClienteComponent]
    });
    fixture = TestBed.createComponent(DetallerEventoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
