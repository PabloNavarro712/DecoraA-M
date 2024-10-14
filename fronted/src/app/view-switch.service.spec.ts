import { TestBed } from '@angular/core/testing';

import { ViewSwitchService } from './view-switch.service';

describe('ViewSwitchService', () => {
  let service: ViewSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
