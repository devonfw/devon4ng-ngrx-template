import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

/* @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  /* Creates an instance of AppComponent.
   * @param {Router} router
   * @param {MatIconRegistry} iconReg
   * @param {DomSanitizer} sanitizer
   * @memberof AppComponent
   */
  constructor(
    public router: Router,
    public iconReg: MatIconRegistry,
    public sanitizer: DomSanitizer,
  ) {
    // Icon registered
    iconReg.addSvgIcon(
      'logo',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/Logo.svg'),
    );
  }
}
