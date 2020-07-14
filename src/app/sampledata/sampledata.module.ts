import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from '../core/core.module';
import { SampleDataDialogComponent } from '../sampledata/components/sampledata-dialog/sampledata-dialog.component';
import { SampleDataAlertComponent } from './components/sampledata-alert/sampledata-alert.component';
import { SampleDataGridComponent } from './components/sampledata-grid/sampledata-grid.component';
import { SampleDataRoutingModule } from './sampledata-routing.module';
import { SampleDataEffects } from './store/effects/sampledata.effects';
import { reducers } from './store/reducers/index';

/* @export
 * @class SampleDataModule
 */
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SampleDataRoutingModule,
    StoreModule.forFeature('sampledatareducer', reducers),
    EffectsModule.forFeature([SampleDataEffects]),
  ],
  declarations: [
    SampleDataGridComponent,
    SampleDataDialogComponent,
    SampleDataAlertComponent,
  ],
  providers: [],
})
export class SampleDataModule {}
