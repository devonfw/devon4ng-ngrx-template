import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BusinessOperationsService } from '../../core/shared/business-operations.service';
import { environment } from '../../../environments/environment';
/* @export
 * @class LoginService
 */
@Injectable()
export class LoginService {
  /* Creates an instance of LoginService.
   * @param {Router} router
   * @param {BusinessOperationsService} bo
   * @param {HttpClient} http
   * @memberof LoginService
   */
  constructor(
    public router: Router,
    private bo: BusinessOperationsService,
    private http: HttpClient,
  ) {}

  /* @param {string} username
   * @param {string} password
   * @returns {Observable<any>}
   * @memberof LoginService
   */
  login(username: string, password: string): Observable<any> {
    let options: any;

    // CSRF
    if (environment.security === 'csrf') {
      options = {
        withCredentials: true,
        responseType: 'text',
      };
    }

    // JWT
    if (environment.security === 'jwt') {
      options = { responseType: 'text', observe: 'response' };
    }

    return this.http.post(
      this.bo.login(),
      {
        username,
        password,
      },
      options,
    );
  }

  /* @returns {Observable<string>}
   * @memberof LoginService
   */
  logout(): Observable<string> {
    return this.http.get(this.bo.logout(), { responseType: 'text' });
  }

  /* @returns {Observable<any>}
   * @memberof LoginService
   */
  getCsrf(): Observable<any> {
    return this.http.get(this.bo.getCsrf(), { withCredentials: true });
  }
}
