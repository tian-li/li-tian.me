import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';

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
  blogs: Blog[];

  constructor(private route: ActivatedRoute,
    private store: Store<fromBlog.State>) { 
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.store.dispatch(new BlogActions.LoadBlogsFromPage(params.get('pageNumber'))));
    // this.store.dispatch(new BlogActions.LoadAllBlogs());
    this.store.pipe(select(fromBlog.getAllBlogs)).subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
  }

}