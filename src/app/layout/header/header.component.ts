import { Router } from '@angular/router';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../core/security/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
/// import { AppState } from '../../sampledata/store/app.states';
import { AppState } from '../../sampledata/store/reducers/index';
import { LogOutAction } from '../../auth/store/actions/authentication.actions';

/* @export
 * @class HeaderComponent
 */
@Component({
  selector: 'public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sideNavOpened: boolean = false;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  /* Creates an instance of HeaderComponent.
   * @param {Router} router
   * @param {TranslateService} translate
   * @param {AuthService} auth
   * @param {Store<AppState>} store
   * @memberof HeaderComponent
   */
  constructor(
    public router: Router,
    private translate: TranslateService,
    private auth: AuthService,
    private store: Store<AppState>,
  ) {}

  toggleSideNav(): void {
    this.sideNavOpened = !this.sideNavOpened;
    this.toggle.emit(this.sideNavOpened);
  }

  /* @param {string} option
   * @memberof HeaderComponent
   */
  toggleLanguage(option: string): void {
    this.translate.use(option);
  }

  /* @param {string} lang
   * @returns {boolean}
   * @memberof HeaderComponent
   */
  isCurrentLang(lang: string): boolean {
    return this.translate.currentLang !== lang;
  }

  /* @returns {boolean}
   * @memberof HeaderComponent
   */
  isLogged(): boolean {
    return this.auth.isLogged() || false;
  }
  logout(): void {
    this.store.dispatch(new LogOutAction());
  }
}
