import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private token: string;

  constructor(public router: Router) {}

  public isLogged(): boolean {
    return this.loggedIn || false;
  }

  public setLogged(login: boolean): void {
    this.loggedIn = login;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }
}
