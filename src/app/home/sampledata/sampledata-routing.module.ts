import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/security/auth-guard.service';
import { NavBarComponent } from '../../layout/nav-bar/nav-bar.component';
import { InitialPageComponent } from '../initial-page/components/initial-page.component';
import { SampleDataGridComponent } from './components/sampledata-grid/sampledata-grid.component';

const routes: Routes = [
  {
    path: 'home',
    component: NavBarComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/initialPage',
        pathMatch: 'full',
      },
      {
        path: 'initialPage',
        component: InitialPageComponent,
      },
      {
        path: 'sampleData',
        component: SampleDataGridComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SampleDataRoutingModule {}
