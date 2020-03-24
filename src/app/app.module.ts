import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SampleDataModule } from './home/sampledata/sampledata.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { reducers, CustomSerializer } from './store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoginComponent } from './auth/components/login.component';

import { AuthDataModule } from './auth/auth.module';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
  DefaultRouterStateSerializer,
} from '@ngrx/router-store';
import { TranslocoRootModule } from './transloco-root.module';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

/* @export
 * @class AppModule
 */
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AuthDataModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
      stateKey: 'routerReducer',
    }),
    EffectsModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
