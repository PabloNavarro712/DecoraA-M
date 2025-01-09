import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaAdminComponent } from './plantilla-admin.component';

describe('PlantillaAdminComponent', () => {
  let component: PlantillaAdminComponent;
  let fixture: ComponentFixture<PlantillaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantillaAdminComponent]
    });
    fixture = TestBed.createComponent(PlantillaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
