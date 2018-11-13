import { TestBed, inject } from '@angular/core/testing';

import { Loginservice } from './login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Loginservice]
    });
  });

  it('should be created', inject([Loginservice], (service: Loginservice) => {
    expect(service).toBeTruthy();
  }));
});
