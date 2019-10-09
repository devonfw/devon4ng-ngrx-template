import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./home/sampledata/sampledata.module').then(
        m => m.SampleDataModule,
      ),
  },
];

/* @export
 * @class AppRoutingModule
 */
@NgModule({
  exports: [RouterModule],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {
        router: routerReducer,
      },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      },
    ),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class AppRoutingModule {}
