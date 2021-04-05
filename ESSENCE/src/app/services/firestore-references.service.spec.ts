import { TestBed } from '@angular/core/testing';

import { FirestoreReferencesService } from './firestore-references.service';

describe('FirestoreReferencesService', () => {
  let service: FirestoreReferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreReferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
