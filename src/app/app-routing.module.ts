import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard } from './core/security/auth-guard.service';
// import{LogInComponent}  from './sampledata/log-in/log-in.component'
// import { HomeComponent } from './home/home.component';
// import { InitialPageComponent } from './home/initial-page/initial-page.component';
// //import { ErrorPageComponent } from './sampledata/error-page/error-page.component';
// import { SampledataGridDisplayComponent } from './sampledata/sampledata-grid-display/sampledata-grid-display.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login', loadChildren: './sampledata/sampledata.module#SampleDataModule',
  },
  
  
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {}
