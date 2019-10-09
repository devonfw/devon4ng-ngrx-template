import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticateModel } from '../../auth/models/authentication.model';
import * as fromStore from '../store';
import { logInAction } from '../store/actions/authentication.actions';
import { getAuthState } from '../store/reducers/index';

/* @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authState$: Observable<LoginComponent>;
  /* Creates an instance of LoginComponent.
   * @param {Store<fromStore.Authentication>} store
   * @memberof LoginComponent
   */
  constructor(private store: Store<fromStore.Authentication>) {}
  ngOnInit(): void {
    this.authState$ = this.store.select(getAuthState);
  }
  /* @param {*} login
   * @memberof LoginComponent
   */
  login(login: any): void {
    const authenticateModel: AuthenticateModel = {
      username: login.value.username,
      password: login.value.password,
    };
    this.store.dispatch(logInAction({ authenticateModel }));
  }
}
