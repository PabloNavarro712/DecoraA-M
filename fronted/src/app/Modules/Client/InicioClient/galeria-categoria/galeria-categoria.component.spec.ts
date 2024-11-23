import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaCategoriaComponent } from './galeria-categoria.component';

describe('GaleriaCategoriaComponent', () => {
  let component: GaleriaCategoriaComponent;
  let fixture: ComponentFixture<GaleriaCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaleriaCategoriaComponent]
    });
    fixture = TestBed.createComponent(GaleriaCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
