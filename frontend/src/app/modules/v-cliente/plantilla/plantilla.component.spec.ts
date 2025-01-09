import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaComponent } from './plantilla.component';

describe('PlantillaComponent', () => {
  let component: PlantillaComponent;
  let fixture: ComponentFixture<PlantillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantillaComponent]
    });
    fixture = TestBed.createComponent(PlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
