import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';

/* @export
 * @class HomeComponent
 */
@Component({
  selector: 'public-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  sideNavOpened: boolean = false;
  /* Creates an instance of HomeComponent.
   * @param {Router} router
   * @param {TdMediaService} media
   * @memberof HomeComponent
   */
  constructor(private router: Router, public media: TdMediaService) {}

  /* @param {string} route
   * @memberof HomeComponent
   */
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  /* @param {boolean} value
   * @memberof HomeComponent
   */
  onToggle(value: boolean): void {
    this.sideNavOpened = value;
  }

  close(): void {
    this.sideNavOpened = false;
  }
}
