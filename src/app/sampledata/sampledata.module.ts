import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { SampleDataService } from './services/sampledata.service';
import { SampledataGridDisplayComponent } from '../sampledata/sampledata-grid-display/sampledata-grid-display.component';
import { SampleDataDialogComponent } from '../sampledata/sampledata-dialog/sampledata-dialog.component';
import { SampleDataRoutingModule } from './sampledata-routing.module';
import { HomeModule } from '../home/home.module';
import { effects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SampleDataRoutingModule,
    HomeModule,
    StoreModule.forFeature('sampledatareducer', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [SampledataGridDisplayComponent, SampleDataDialogComponent],
  entryComponents: [SampleDataDialogComponent],
  providers: [SampleDataService],
})
export class SampleDataModule {}
