import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AddDataService  implements OnInit {
  private urlService: string = environment.restServiceRoot +
  'sampledatamanagement/v1/sampledata/';
  
  constructor(
    private http: HttpClient,
  
  ) {}

  ngOnInit(): void {
   
  }
  

  saveSampleData(data: any): Observable<Object> {
    debugger;
    
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
    // private componentMethodCallSource = new Subject<any>();
  
    // // Observable string streams
    // componentMethodCalled$ = this.componentMethodCallSource.asObservable();
  
    // // Service message commands
    // callComponentMethod() {
    //   this.componentMethodCallSource.next();
    // }
  }

