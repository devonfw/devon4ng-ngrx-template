import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { SearchCriteria } from '../../core/interfaces/search-criteria';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  private componentMethodCallSource: any = new Subject<any>();
  private componentFilterMethodCallSource: any = new Subject<any>();
  private urlService: string =
    environment.restServiceRoot + 'sampledatamanagement/v1/sampledata/';

  componentMethodCalled$: any = this.componentMethodCallSource.asObservable();
  componentFilterMethodCalled$: any = this.componentFilterMethodCallSource.asObservable();
  constructor(private http: HttpClient, public router: Router) {}
  getSampleData(
    size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): Observable<any> {
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
    return this.http.post<any>(this.urlService + 'search', searchCriteria);
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

  callComponentMethod(): void {
    this.componentMethodCallSource.next();
  }
  callfilterComponentMethod(): void {
    this.componentFilterMethodCallSource.next();
  }
}
