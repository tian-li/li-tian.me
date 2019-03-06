import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

const blogRoutes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      { path: '', component: BlogListComponent },
      // { path: '', redirectTo: '?page=1', pathMatch: 'full' },
      // { path: 'page', redirectTo: 'page/1', pathMatch: 'full' },
      // { path: 'page/:pageNumber', component: BlogListComponent },
    ],
  },
  { path: 'blog/:id', component: BlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(blogRoutes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
