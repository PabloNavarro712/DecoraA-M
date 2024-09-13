import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiembenidaComponent } from './biembenida.component';

describe('BiembenidaComponent', () => {
  let component: BiembenidaComponent;
  let fixture: ComponentFixture<BiembenidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiembenidaComponent]
    });
    fixture = TestBed.createComponent(BiembenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
