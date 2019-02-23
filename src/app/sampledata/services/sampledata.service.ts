import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { SearchCriteria } from '../../core/interfaces/search-criteria';
import { Router } from '@angular/router';
import { SampledataModel } from '../models/sampledata.model';

@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  private urlService: string =
    environment.restServiceRoot + 'sampledatamanagement/v1/sampledata/';

  constructor(private http: HttpClient, public router: Router) {}
  getSampleData(
    size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): Observable<SampledataModel[]> {
    const searchCriteria: SearchCriteria = {
      pageable: {
        pageSize: size,
        pageNumber: page,
        sort: sort,
      },
      name: searchTerms.name,
      surname: searchTerms.surname,
      age: searchTerms.age,
      mail: searchTerms.mail,
    };
    return this.http.post<SampledataModel[]>(
      this.urlService + 'search',
      searchCriteria,
    );
  }
  saveSampleData(data: any): Observable<Object> {
    const obj: any = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      mail: data.mail,
    };
    return this.http.post(this.urlService, obj);
  }
  editSampleData(data: any): Observable<Object> {
    const obj: any = {
      id: data.id,
      name: data.name,
      modificationCounter: data.modificationCounter,
      surname: data.surname,
      age: data.age,
      mail: data.mail,
    };

    return this.http.post(this.urlService, obj);
  }
  searchSampleData(criteria: any): Observable<Object> {
    return this.http.post(this.urlService + 'search', {
      criteria: criteria,
    });
  }

  deleteSampleData(id: number): Observable<Object> {
    return this.http.delete(this.urlService + id);
  }
}
