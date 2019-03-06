import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/* @export
 * @class BusinessOperationsService
 */
@Injectable()
export class BusinessOperationsService {
  public serverPath: string = environment.restServiceRoot;
  public restPath: string = environment.restPathRoot;

  /* @returns {string}
   * @memberof BusinessOperationsService
   */
  login(): string {
    return this.serverPath + 'login';
  }

  /* @returns {string}
   * @memberof BusinessOperationsService
   */
  logout(): string {
    return this.serverPath + 'logout';
  }

  /* @returns {string}
   * @memberof BusinessOperationsService
   */
  getCsrf(): string {
    return this.serverPath + 'security/v1/csrftoken';
  }
}
