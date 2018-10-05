import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/blog/page/1', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'blog' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        scrollPositionRestoration: 'enabled',
        // enableTracing: true,
      },
    )
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }