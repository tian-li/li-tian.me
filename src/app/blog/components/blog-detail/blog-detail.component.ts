import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as marked from 'marked';

import * as hljs from 'highlight.js';

import * as fromBlog from '../../reducer';
import { Blog } from '../../model/blog';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<Blog>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) { }

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
        return this.store.pipe(select(fromBlog.getSelectedBlog));
      }));
  }

  ngAfterViewInit() {
    console.log('hljs', hljs)
    hljs.initHighlightingOnLoad();
  }

}
