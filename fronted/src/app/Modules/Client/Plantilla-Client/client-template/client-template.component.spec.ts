import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTemplateComponent } from './client-template.component';

describe('ClientTemplateComponent', () => {
  let component: ClientTemplateComponent;
  let fixture: ComponentFixture<ClientTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTemplateComponent]
    });
    fixture = TestBed.createComponent(ClientTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
