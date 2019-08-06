import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

const blogRoutes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: '', component: BlogListComponent },
      { path: ':id', component: BlogDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
