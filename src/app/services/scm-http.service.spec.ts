import { TestBed } from '@angular/core/testing';

import { ScmHttpService } from './scm-http.service';

describe('ScmHttpService', () => {
  let service: ScmHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScmHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
