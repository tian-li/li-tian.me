import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';

import * as fromBlog from '../../reducer';
import { Blog } from '../../model/blog';
import * as BlogActions from '../../actions/blog.actions';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blog: Blog;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
    });

    combineLatest(
      this.store.pipe(select(fromBlog.getSelectedBlog)),
      this.store.pipe(select(fromBlog.getErrorMessage))
    ).subscribe(([blog, errorMessage]: [Blog, string]) => {
      if (!errorMessage && !!blog) {
        this.titleService.setTitle(`${blog.title} | Tian`);
      }
      this.blog = blog;
      this.errorMessage = errorMessage;
    });
  }
}
