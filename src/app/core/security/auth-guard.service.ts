import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
// import { Store } from '@ngrx/store';
// import * as fromStore from '../../sampledata/store/app.states';
// import { take } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router, // private store: Store<fromStore.AppState>,
  ) {}

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
  // checkStoreAuthentication(): any {
  //   return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  // }
}
