import { TestBed } from '@angular/core/testing';

import { CategoryitemService } from './categoryitem.service';

describe('CategoryitemService', () => {
  let service: CategoryitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
