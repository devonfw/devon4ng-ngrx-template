import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';

import { Store } from '@ngrx/store';

import { AppState,selectAuthState } from '../store/app.states';
import { LogInAction,LogOutAction } from '../store/actions/oasp-templetes.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  //template: `dfgdfgdfgdfgdfgdfgdf`,
  styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
 user: Login = new Login();
 getState: Observable<any>;
 errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    debugger;
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    debugger;
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  };

  onSubmit(): void {
    
    
    const payload = {
      
      
      username: this.user.username,
      password: this.user.password
    };
    
    debugger;
     this.store.dispatch(new LogInAction(payload));
    
  }
  




}