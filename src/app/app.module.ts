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

//import { RouterModule } from '@angular/router';
import { reducers } from './sampledata/store/app.states';
// import { AuthEffects } from './sampledata/store//effects/login.effects';
// import { AddDataEffects } from './sampledata/store//effects/AddData.effects';
// import { DeleteDataEffects } from './sampledata/store//effects/DeleteData.effects';
// import {EditataEffects} from './sampledata/store//effects/EditData.effects'
import { Loginservice } from './sampledata/services/login.service';
import { ErrorPageComponent } from './sampledata/error-page/error-page.component';
//import { SampledataGridDisplayComponent } from './sampledata/sampledata-grid-display/sampledata-grid-display.component';
// AoT requires an exported function for factories

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
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ],
  providers: [Loginservice],
  bootstrap: [AppComponent],
})
export class AppModule {}
