import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LayoutModule } from '../layout/layout.module';
import { AuthDataRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login.component';
import { effects, reducers } from './store/reducers/index';

/* @export
 * @class AuthDataModule
 */
@NgModule({
  imports: [
    LayoutModule,
    AuthDataRoutingModule,
    StoreModule.forFeature('authdatareducer', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [],
  providers: [LoginComponent],
})
export class AuthDataModule {}
