import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBlog from './reducer';
import { Blog } from './model/blog';
import * as BlogActions from './actions/blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  // blogs$: Observable<Blog[]>;
  // allBlogCount: Observable<number>;

  // constructor(
  //   private route: ActivatedRoute,
  //   private store: Store<fromBlog.State>,
  // ) {
  //   this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
    
  // }

  // ngOnInit(): void {
  //   this.store.dispatch(new BlogActions.LoadAllBlogCount());
  //   this.route.paramMap.subscribe((params: ParamMap) => this.store.dispatch(new BlogActions.LoadBlogsFromPage(params.get('pageNumber'))));
  // }
}