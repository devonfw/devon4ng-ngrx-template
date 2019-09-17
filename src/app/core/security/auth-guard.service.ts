import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

/* @export
 * @class AuthGuard
 * @implements {CanActivateChild}
 */
@Injectable()
export class AuthGuard implements CanActivateChild {
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
  canActivateChild(
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
