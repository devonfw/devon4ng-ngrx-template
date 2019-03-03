import { TestBed, inject } from '@angular/core/testing';
import { SampleDataService } from './sampledata.service';

import { CoreModule } from '../../core/core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('SidenavSharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        RouterTestingModule,
        CoreModule,
        BrowserModule,
        HttpClientModule,
      ],
    });
  });

  it('should create', inject(
    [SampleDataService],
    (service: SampleDataService) => {
      expect(service).toBeTruthy();
    },
  ));
});
