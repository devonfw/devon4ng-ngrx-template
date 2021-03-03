import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class HttpRequestInterceptorService implements HttpInterceptor {
  /* Creates an instance of HttpRequestInterceptorService.
   * @param {AuthService} auth
   * @memberof HttpRequestInterceptorService
   */
  constructor(private auth: AuthService) {}

  /* @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof HttpRequestInterceptorService
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader: string = this.auth.getToken();
    if (authHeader) {
      let authReq: HttpRequest<any>;

      // CSRF
      if (environment.security === 'csrf') {
        authReq = req.clone({
          withCredentials: true,
          setHeaders: { 'x-csrf-token': authHeader },
        });
      }
      // JWT
      if (environment.security === 'jwt') {
        authReq = req.clone({
          setHeaders: { authorization: authHeader },
        });
      }

      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
