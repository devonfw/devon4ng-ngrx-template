import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

/* @export
 * @class LayoutModule
 */
@NgModule({
  imports: [CommonModule, CoreModule, AppRoutingModule, TranslateModule],
  providers: [],
  declarations: [NavBarComponent, HeaderComponent],
  exports: [NavBarComponent, HeaderComponent],
})
export class LayoutModule {}
