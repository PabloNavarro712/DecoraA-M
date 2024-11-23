import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGaleriaEditorComponent } from './admin-galeria-editor.component';

describe('AdminGaleriaEditorComponent', () => {
  let component: AdminGaleriaEditorComponent;
  let fixture: ComponentFixture<AdminGaleriaEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGaleriaEditorComponent]
    });
    fixture = TestBed.createComponent(AdminGaleriaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
