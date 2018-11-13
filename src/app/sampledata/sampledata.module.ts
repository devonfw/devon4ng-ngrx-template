import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import { reducers } from './store/app.states';
import {EffectsModule} from '@ngrx/effects';
import { SampleDataService } from './services/sampledata.service';
import { AuthEffects } from './store//effects/login.effects';
import { SampledataGridDisplayComponent } from '../sampledata/sampledata-grid-display/sampledata-grid-display.component';
import { SampleDataDialogComponent } from '../sampledata/sampledata-dialog/sampledata-dialog.component';
import { SampleDataRoutingModule } from './sampledata-routing.module'
import { LandingComponent } from './landing/landing.component';
import { HomeModule } from '../home/home.module';
import { AddDataEffects } from './store/effects/AddData.effects';
import { DeleteDataEffects } from './store/effects/DeleteData.effects';
import { EditataEffects } from './store/effects/EditData.effects';
import { SearchDataEffects } from './store/effects/SearchData.effect';

@NgModule({
  imports: [CommonModule, CoreModule, TranslateModule,SampleDataRoutingModule,HomeModule,
   
    StoreModule.forFeature('sampledatareducer',reducers),
    EffectsModule.forFeature([AuthEffects,AddDataEffects,DeleteDataEffects,EditataEffects,SearchDataEffects]),
   ],
  declarations: [SampledataGridDisplayComponent, SampleDataDialogComponent,LandingComponent],
  entryComponents: [SampleDataDialogComponent],
  providers: [SampleDataService],
})
export class SampleDataModule {}
