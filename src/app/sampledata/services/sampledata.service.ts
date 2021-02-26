import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SearchCriteria } from '../../shared/models/search-criteria';
import { HttpResponseModel } from '../models/httpresponse.model';
import { SampleDataModel } from '../models/sampledata.model';

@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  private urlService: string =
    environment.restServiceRoot + 'sampledatamanagement/v1/sampledata/';

  /* Creates an instance of SampleDataService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof SampleDataService
   */
  constructor(private http: HttpClient, public router: Router) {}

  /* @param {number} size
   * @param {number} page
   * @param {*} searchTerms
   * @param {any[]} sort
   * @returns {Observable<SampleDataModel[]>}
   * @memberof SampleDataService
   */
  getSampleData(
    size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): Observable<HttpResponseModel> {
    const searchCriteria: SearchCriteria = {
      pageable: {
        pageSize: size,
        pageNumber: page,
        sort,
      },
      name: searchTerms.name,
      surname: searchTerms.surname,
      age: searchTerms.age,
      email: searchTerms.email,
    };

    return this.http.post<HttpResponseModel>(
      this.urlService + 'search',
      searchCriteria,
    );
  }

  /* @param {*} data
   * @returns {Observable<unknown>}
   * @memberof SampleDataService
   */
  saveSampleData(data: SampleDataModel): Observable<unknown> {
    const obj: SampleDataModel = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      email: data.email,
    };
    return this.http.post<SampleDataModel>(this.urlService, obj);
  }

  /* @param {*} data
   * @returns {Observable<SampleDataModel>}
   * @memberof SampleDataService
   */
  editSampleData(data: SampleDataModel): Observable<SampleDataModel> {
    const obj: SampleDataModel = {
      id: data.id,
      name: data.name,
      modificationCounter: data.modificationCounter,
      surname: data.surname,
      age: data.age,
      email: data.email,
    };

    return this.http.post<SampleDataModel>(this.urlService, obj);
  }

  /* @param {*} criteria
   * @returns {Observable<unknown>}
   * @memberof SampleDataService
   */
  searchSampleData(criteria: any) {
    return this.http.post<HttpResponseModel>(this.urlService + 'search', {
      criteria,
    });
  }

  /* @param {number} id
   * @returns {Observable<unknown>}
   * @memberof SampleDataService
   */
  deleteSampleData(id: number) {
    return this.http.delete(this.urlService + id);
  }
}
