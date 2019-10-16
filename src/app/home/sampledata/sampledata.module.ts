import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { SampleDataDialogComponent } from '../sampledata/components/sampledata-dialog/sampledata-dialog.component';
import { SampleDataRoutingModule } from './sampledata-routing.module';

import { SampleDataGridComponent } from './components/sampledata-grid/sampledata-grid.component';
import { SampleDataAlertComponent } from './components/sampledata-alert/sampledata-alert.component';
import { SampleDataEffects } from './store/effects/sampledata.effects';
import { InitialPageModule } from '../initial-page/initial-page.module';

/* @export
 * @class SampleDataModule
 */
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule,
    SampleDataRoutingModule,
    StoreModule.forFeature('sampledatareducer', reducers),
    EffectsModule.forFeature([SampleDataEffects]),
  ],
  declarations: [
    SampleDataGridComponent,
    SampleDataDialogComponent,
    SampleDataAlertComponent,
  ],
  entryComponents: [SampleDataDialogComponent, SampleDataAlertComponent],
  providers: [],
})
export class SampleDataModule {}
