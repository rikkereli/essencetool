import { TestBed } from '@angular/core/testing';

import { CategoryBoxService } from './category-box.service';

describe('CategoryBoxService', () => {
  let service: CategoryBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
