import { TestBed } from '@angular/core/testing';

import { SwotitemService as SwotitemService } from './swotitem.service';

describe('SwotitemService', () => {
  let service: SwotitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwotitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
