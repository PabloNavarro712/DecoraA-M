import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCarruselComponent } from './componente-carrusel.component';

describe('ComponenteCarruselComponent', () => {
  let component: ComponenteCarruselComponent;
  let fixture: ComponentFixture<ComponenteCarruselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteCarruselComponent]
    });
    fixture = TestBed.createComponent(ComponenteCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
