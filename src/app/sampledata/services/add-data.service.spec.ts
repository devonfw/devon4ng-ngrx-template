import { TestBed, inject } from '@angular/core/testing';

import { AddDataService } from './add-data.service';

describe('AddDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDataService]
    });
  });

  it('should be created', inject([AddDataService], (service: AddDataService) => {
    expect(service).toBeTruthy();
  }));
});
