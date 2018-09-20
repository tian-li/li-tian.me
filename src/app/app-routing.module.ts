import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },
  { path: '', redirectTo: '/blog/page/1', pathMatch: 'full' },
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
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }