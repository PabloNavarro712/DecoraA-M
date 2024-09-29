import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGalleryEditorComponent } from './admin-gallery-editor.component';

describe('AdminGalleryEditorComponent', () => {
  let component: AdminGalleryEditorComponent;
  let fixture: ComponentFixture<AdminGalleryEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGalleryEditorComponent]
    });
    fixture = TestBed.createComponent(AdminGalleryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
