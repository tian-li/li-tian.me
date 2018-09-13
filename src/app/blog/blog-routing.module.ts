import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const blogRoutes = [
  {
    path: '',
    component: BlogComponent,
    children: [{ path: '', component: BlogListComponent },]
  },
  { path: 'blog/:id', component: BlogDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(blogRoutes),
  ],
  exports: [RouterModule],
})
export class BlogRoutingModule { }