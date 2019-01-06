import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import { Store } from '@ngrx/store';
import { LogInAction } from '../store/actions/sampledata.actions';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../store/app.states';

@Component({
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  user: Login = new Login();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }
  ngOnInit(): void {
    this.getState.subscribe((state: any) => {
      this.errorMessage = state.errorMessage;
    });
  }
  onSubmit(): void {
    const payload: Login = {
      username: this.user.username,
      password: this.user.password,
    };
    this.store.dispatch(new LogInAction(payload));
  }
}
