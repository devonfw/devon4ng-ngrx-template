import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

/* @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /* Creates an instance of AuthGuard.
   * @param {AuthService} authService
   * @param {Router} router
   * @memberof AuthGuard
   */
  constructor(private authService: AuthService, private router: Router) {}

  /* @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    if (this.authService.isLogged()) {
      return true;
    }
    if (this.router.url === '/') {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
