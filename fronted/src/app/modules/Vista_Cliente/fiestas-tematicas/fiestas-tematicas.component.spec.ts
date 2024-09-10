import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiestasTematicasComponent } from './fiestas-tematicas.component';

describe('FiestasTematicasComponent', () => {
  let component: FiestasTematicasComponent;
  let fixture: ComponentFixture<FiestasTematicasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiestasTematicasComponent]
    });
    fixture = TestBed.createComponent(FiestasTematicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
