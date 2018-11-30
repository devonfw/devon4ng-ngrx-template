import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
