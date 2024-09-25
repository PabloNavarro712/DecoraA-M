import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexClienteComponent } from './index-cliente.component';

describe('IndexClienteComponent', () => {
  let component: IndexClienteComponent;
  let fixture: ComponentFixture<IndexClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexClienteComponent]
    });
    fixture = TestBed.createComponent(IndexClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
