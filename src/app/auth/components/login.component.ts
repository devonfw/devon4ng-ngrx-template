import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LogInAction } from '../store/actions/authentication.actions';
import { AuthenticateModel } from '../../auth/models/authentication.model';
import * as fromStore from '../store';
import { getAuthState } from '../store/reducers/index';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  authState$: Observable<LoginComponent>;
  constructor(private store: Store<fromStore.Authentication>) {}
  ngOnInit(): void {
    this.authState$ = this.store.select(getAuthState);
  }

  login(login: any): void {
    const payload: AuthenticateModel = {
      username: login.value.username,
      password: login.value.password,
    };
    this.store.dispatch(new LogInAction(payload));
  }
}
