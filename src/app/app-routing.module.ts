import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  // { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },
  { path: '', redirectTo: '/blog', pathMatch: 'full'}, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }