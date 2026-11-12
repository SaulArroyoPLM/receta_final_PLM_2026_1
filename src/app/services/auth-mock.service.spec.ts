import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthMockService } from './auth-mock.service';

describe('AuthMockService', () => {
  let service: AuthMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
