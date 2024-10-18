import { TestBed } from '@angular/core/testing';

import { authenticationIntercertors } from './authenticationInterceptors.service';

describe('authenticationIntercertors', () => {
  let service: authenticationIntercertors;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(authenticationIntercertors);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
