import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

/* @export
 * @class AppComponent
 */
@Component({
  selector: 'public-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /* Creates an instance of AppComponent.
   * @param {Router} router
   * @param {TranslateService} translate
   * @param {MatIconRegistry} iconReg
   * @param {DomSanitizer} sanitizer
   * @memberof AppComponent
   */
  constructor(
    public router: Router,
    public translate: TranslateService,
    public iconReg: MatIconRegistry,
    public sanitizer: DomSanitizer,
  ) {
    // NGX Translate
    translate.setDefaultLang('en');
    translate.use('en');
    // Icon registered
    iconReg.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/Logo.svg'),
    );
  }
}
