import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumpleanosComponent } from './cumpleanos.component';

describe('CumpleanosComponent', () => {
  let component: CumpleanosComponent;
  let fixture: ComponentFixture<CumpleanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CumpleanosComponent]
    });
    fixture = TestBed.createComponent(CumpleanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
