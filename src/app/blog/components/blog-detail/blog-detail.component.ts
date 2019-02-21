import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import * as BlogActions from '../../actions/blog.actions';
import { Blog } from '../../model/blog';

import * as fromBlog from '../../reducer';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: Blog;
  errorMessage: HttpErrorResponse;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params: ParamMap) => {
      this.store.dispatch(new BlogActions.LoadOneBlog({ blogNumber: parseInt(params.get('id'), 10) }));
    });

    combineLatest(
      this.store.pipe(select(fromBlog.getSelectedBlog)),
      this.store.pipe(select(fromBlog.getErrorMessage))
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe(([blog, errorMessage]: [Blog, HttpErrorResponse]) => {
      if (!errorMessage && !!blog) {
        this.titleService.setTitle(`${blog.title} | Tian`);
      }
      this.blog = blog;
      this.errorMessage = errorMessage;
      console.log('errorMessage', this.errorMessage);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
