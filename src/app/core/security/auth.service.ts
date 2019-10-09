import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/* @export
 * @class AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private token: string;

  /* Creates an instance of AuthService.
   * @param {Router} router
   * @memberof AuthService
   */
  constructor(public router: Router) {}

  /* @returns {boolean}
   * @memberof AuthService
   */
  public isLogged(): boolean {
    return this.loggedIn || false;
  }

  /* @param {boolean} login
   * @memberof AuthService
   */
  public setLogged(login: boolean): void {
    this.loggedIn = login;
  }

  /* @returns {string}
   * @memberof AuthService
   */
  public getToken(): string {
    return this.token;
  }

  /* @param {string} token
   * @memberof AuthService
   */
  public setToken(token: string): void {
    this.token = token;
  }
}
