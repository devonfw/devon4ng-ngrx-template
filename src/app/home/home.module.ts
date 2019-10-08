import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { LayoutModule } from '../layout/layout.module';

import { InitialPageComponent } from './initial-page/initial-page.component';

/* @export
 * @class HomeModule
 */
@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    LayoutModule,
    AppRoutingModule,
    TranslateModule,
  ],
  providers: [],
  declarations: [InitialPageComponent],
  exports: [InitialPageComponent],
})
export class HomeModule {}
