import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { PageData } from '../../core/interfaces/page-data';
import { Login } from '../models/login.model';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SampleDataService {
  private urlService: string = environment.restServiceRoot +
  'sampledatamanagement/v1/sampledata/';
  constructor(private http: HttpClient) {}
  getSampleData( size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): 
  Observable<any> {
    debugger
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
   // debugger;
    
    const obj: any = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      email: data.email,
    };
    return this.http.post(this.urlService, obj);
  }
  deleteSampleData(id: number): Observable<Object> {
   
    return this.http.delete(this.urlService + id);
  }
  searchSampleData(criteria: any): Observable<Object> {
    return this.http.post(this.urlService + 'search', {
      criteria: criteria,
    });
  }
  index(): Observable<Login[]> {
    
    return this.http.get<Login[]>(`${this.urlService}/contacts`);

  }

  getSampleDatas1(): void {
    
  }
private componentMethodCallSource = new Subject<any>();
  
  // Observable string streams
  componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.componentMethodCallSource.next();
  }
  callComponentMethod1( size: number,
    page: number,
    searchTerms: any,
    sort: any[],) {
    this.componentMethodCallSource.next();
  }
  
}










