import { Component, OnInit } from '@angular/core';
import { Sampledata } from '../sampledata/models/sampledata.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../sampledata/store/app.states';
import { LogInAction } from '../sampledata/store/actions/sampledata.actions';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: Sampledata = new Sampledata();
  getState: Observable<any>;
  // errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }
  ngOnInit(): void {
    this.getState.subscribe((state: any) => {
      // this.errorMessage = state.errorMessage;
    });
  }

  login(login: any): void {
    const payload: Sampledata = {
      username: login.value.username,
      password: login.value.password,
    };
    this.store.dispatch(new LogInAction(payload));
  }
}
