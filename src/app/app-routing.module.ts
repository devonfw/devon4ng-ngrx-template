import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadChildren: () => import('./sampledata/sampledata.module').then(m => m.SampleDataModule),
  },
];

/* @export
 * @class AppRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      router: routerReducer,
    }, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }}),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class AppRoutingModule {}
