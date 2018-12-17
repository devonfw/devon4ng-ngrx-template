import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SampleDataModule } from './sampledata/sampledata.module';
import { LogInComponent } from './sampledata/log-in/log-in.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// import { reducers } from './sampledata/store/app.states';
import { ErrorPageComponent } from './sampledata/error-page/error-page.component';
import { SampleDataService } from './sampledata/services/sampledata.service';
// AoT requires an exported function for factories
import { reducers, CustomSerializer } from './store';
import { StoreRouterConnectingModule, RouterStateSerializer, } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
   declarations: [AppComponent,  LogInComponent, ErrorPageComponent],
    imports: [
    BrowserModule,
    SampleDataModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [SampleDataService, { provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
