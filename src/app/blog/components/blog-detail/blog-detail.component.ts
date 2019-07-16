import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Blog } from '../../model/blog';

import { BlogService } from '../../service/blog.service';
import { ErrorMessage } from '../../../shared/models/error-message';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: Blog;
  errorMessage: ErrorMessage;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params: ParamMap) => {
      this.blogService.dispatchLoadOneBlog({ blogNumber: parseInt(params.get('id'), 10) });
    });

    this.blogService.selectedBlog.pipe(takeUntil(this.destroy$)).subscribe((blog: Blog) => {
      if (!!blog) {
        this.titleService.setTitle(`${blog.title} | Tian`);
      }
      this.blog = blog;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
