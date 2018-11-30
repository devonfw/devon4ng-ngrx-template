import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/security/auth-guard.service';
import {LogInComponent}  from '../sampledata/log-in/log-in.component'
import { HomeComponent } from '../home/home.component';
import { InitialPageComponent } from '../home/initial-page/initial-page.component';
import { ErrorPageComponent } from '../sampledata/error-page/error-page.component';
import { SampledataGridDisplayComponent } from '../sampledata/sampledata-grid-display/sampledata-grid-display.component';


const routes: Routes = [
  {
    
    path: 'login',
    component: LogInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home/initialPage',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'initialPage',
        component: InitialPageComponent,
        canActivate: [AuthGuard],
      },
      
      {
        path: 'sampleData',
        component: SampledataGridDisplayComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'FailpageComponent',
    component: ErrorPageComponent,
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
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SampleDataRoutingModule {}
