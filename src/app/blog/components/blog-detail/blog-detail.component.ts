import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as marked from 'marked';

import { BlogService } from '../../service/blog.service';
import * as fromBlog from '../../reducer';
import { Blog } from '../../model/blog';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<Blog>;

  constructor(private blogService: BlogService,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.store.dispatch(new BlogActions.LoadOneBlog(params.get('id')));
        return this.store.pipe(select(fromBlog.getSelectedBlog));
      }));
  }

  safe(html) {
    console.log('html', html);
    let res = marked(html, { sanitize: true });

    console.log('res', res);
    return res;
  }
}
