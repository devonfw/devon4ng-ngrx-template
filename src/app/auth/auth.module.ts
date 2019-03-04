import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { AuthDataRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  imports: [
    AuthDataRoutingModule,
    StoreModule.forFeature('authdatareducer', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [],
  entryComponents: [],
  providers: [LoginComponent],
})
export class AuthDataModule {}
