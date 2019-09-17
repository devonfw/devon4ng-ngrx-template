import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/security/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { InitialPageComponent } from '../home/initial-page/initial-page.component';
import { SampleDataGridComponent } from './components/sampledata-grid/sampledata-grid.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
