import { TestBed } from '@angular/core/testing';

import { ScmApiService } from './scm-http.service';

describe('ScmHttpService', () => {
  let service: ScmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
