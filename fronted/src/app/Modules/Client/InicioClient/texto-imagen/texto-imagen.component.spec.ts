import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoImagenComponent } from './texto-imagen.component';

describe('TextoImagenComponent', () => {
  let component: TextoImagenComponent;
  let fixture: ComponentFixture<TextoImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextoImagenComponent]
    });
    fixture = TestBed.createComponent(TextoImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
