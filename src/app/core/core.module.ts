import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { AuthGuard } from './security/auth-guard.service';
import { AuthService } from './security/auth.service';
import { HttpRequestInterceptorService } from './security/http-request-interceptor.service';
import { LoginService } from './security/login.service';
import { BusinessOperationsService } from './shared/business-operations.service';
import { TranslocoRootModule } from '../transloco-root.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientXsrfModule,
    CdkTableModule,
    RouterModule,
    TranslocoRootModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CdkTableModule,
    TranslocoRootModule,
  ],
  declarations: [],
  providers: [
    AuthGuard,
    LoginService,
    AuthService,
    BusinessOperationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
