import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEdicionComponent } from './panel-edicion.component';

describe('PanelEdicionComponent', () => {
  let component: PanelEdicionComponent;
  let fixture: ComponentFixture<PanelEdicionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelEdicionComponent]
    });
    fixture = TestBed.createComponent(PanelEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
