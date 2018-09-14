import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(private store: Store<fromBlog.State>) { 
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
  }

  ngOnInit() {
    this.store.dispatch(new BlogActions.LoadAllBlogs());
  }

}