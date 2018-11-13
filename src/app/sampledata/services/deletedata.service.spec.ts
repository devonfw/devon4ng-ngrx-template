import { TestBed, inject } from '@angular/core/testing';

import { DeletedataService } from './deletedata.service';

describe('DeletedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeletedataService]
    });
  });

  it('should be created', inject([DeletedataService], (service: DeletedataService) => {
    expect(service).toBeTruthy();
  }));
});
