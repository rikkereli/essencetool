import { TestBed } from '@angular/core/testing';

import { ProspectScenarioService } from './prospect-scenario.service';

describe('ProspectScenarioService', () => {
  let service: ProspectScenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProspectScenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
