import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject,of } from 'rxjs';
import { PageData } from '../../core/interfaces/page-data';
import { Login } from '../models/login.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { BusinessOperationsService } from '../../core/shared/business-operations.service';
@Injectable({
  providedIn: 'root'
})
export class SampleDataService {
  private logged: boolean = false;
  private token: string;
  private urlService: string = environment.restServiceRoot +
  'sampledatamanagement/v1/sampledata/';
  
  constructor(
    private http: HttpClient,
    public router: Router,
    private BO: BusinessOperationsService,
    ) {
  }
  getSampleData( size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): 
  Observable<any> {
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
  
//login service start
login(username: string, password: string): Observable<any> {
   
  let options: any;
//CSRF
  if (environment.security === 'csrf') {
    options = {
      withCredentials: true,
      responseType: 'text',
    };
  }
  //JWT
  if (environment.security === 'jwt') {
    options = { responseType: 'text', observe: 'response' };
  }
  return this.http.post(
    this.BO.login(),
    {
      j_username: username,
      j_password: password,
    },
    options,
  );
}

logout(): Observable<string> {
  return this.http.get(this.BO.logout(), { responseType: 'text' });
}
getCsrf(): Observable<any> {
  return this.http.get(this.BO.getCsrf(), { withCredentials: true });
}
//login services end
//delete service start
deleteSampleData(id: number): Observable<Object> {
  return this.http.delete(this.urlService + id);
}
//delete services end Add Data Service Start

 
//Add Data Services End

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










