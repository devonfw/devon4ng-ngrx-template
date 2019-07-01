import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/* @export
 * @class HomeComponent
 */
@Component({
  selector: 'public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  sideNavOpened: boolean = false;
  isMobile: any;
  /* Creates an instance of HomeComponent.
   * @param {Router} router
   * @memberof HomeComponent
   */
  constructor(private router: Router, private breakpoint: BreakpointObserver) {
    this.breakpoint.observe(Breakpoints.Handset).subscribe((data: any) => {
      this.isMobile = data.matches;
    });
  }

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
