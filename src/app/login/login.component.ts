import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AppState, selectAuthState } from '../sampledata/store/app.states';
import { AppState, getAppState } from '../sampledata/store/reducers/index';
import { LogInAction } from '../sampledata/store/actions/authentication.actions';
import { AuthenticateModel } from '../sampledata/models/authentication.model';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: AuthenticateModel;
  getState: Observable<LoginComponent>;
  // errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(getAppState);
  }
  ngOnInit(): void {
    this.getState.subscribe((state: any) => {
      // this.errorMessage = state.errorMessage;
    });
  }

  login(login: any): void {
    const payload: AuthenticateModel = {
      username: login.value.username,
      password: login.value.password,
    };
    this.store.dispatch(new LogInAction(payload));
  }
}
