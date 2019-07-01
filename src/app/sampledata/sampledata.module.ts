import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { SampleDataDialogComponent } from '../sampledata/components/sampledata-dialog/sampledata-dialog.component';
import { SampleDataRoutingModule } from './sampledata-routing.module';
import { HomeModule } from '../home/home.module';
import { effects } from './store/effects';
import { SampleDataGridComponent } from './components/sampledata-grid/sampledata-grid.component';
import { SampleDataAlertComponent } from './components/sample-data-alert/sample-data-alert.component';

/* @export
 * @class SampleDataModule
 */
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
  declarations: [
    SampleDataGridComponent,
    SampleDataDialogComponent,
    SampleDataAlertComponent,
  ],
  entryComponents: [SampleDataDialogComponent, SampleDataAlertComponent],
  providers: [],
})
export class SampleDataModule {}
