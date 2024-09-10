import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XvanosComponent } from './xvanos.component';

describe('XvanosComponent', () => {
  let component: XvanosComponent;
  let fixture: ComponentFixture<XvanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XvanosComponent]
    });
    fixture = TestBed.createComponent(XvanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
