import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { PageData } from '../../core/interfaces/page-data';
import { Router } from '@angular/router';
import { BusinessOperationsService } from '../../core/shared/business-operations.service';
@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  private componentMethodCallSource: any = new Subject<any>();
  private urlService: string =
    environment.restServiceRoot + 'sampledatamanagement/v1/sampledata/';

  componentMethodCalled$: any = this.componentMethodCallSource.asObservable();

  constructor(
    private http: HttpClient,
    public router: Router,
    private BO: BusinessOperationsService,
  ) {}
  getSampleData(
    size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): Observable<any> {
    const pageData: PageData = {
      pagination: {
        size: size,
        page: page,
        total: 1,
      },
      name: searchTerms.name,
      surname: searchTerms.surname,
      age: searchTerms.age,
      email: searchTerms.email,
      sort: sort,
    };
    return this.http.post<any>(this.urlService + 'search', pageData);
  }
  saveSampleData(data: any): Observable<Object> {
    const obj: any = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      email: data.email,
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
      email: data.email,
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
}
