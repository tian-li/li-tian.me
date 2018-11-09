import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer';
import * as BlogActions from '../../actions/blog.actions';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  blogs$: Observable<Blog[]>;
  blogCount: number;
  blogsPerPage = 5;
  currentPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadAllBlogsInfo());
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));

    combineLatest(this.store.pipe(select(fromBlog.getAllBlogCount)), this.route.paramMap)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([blogCount, params]: [number, ParamMap]) => {
        this.currentPage = parseInt(params.get('pageNumber'), 10);
        this.blogCount = blogCount;
        const overPage: boolean = this.currentPage > this.blogCount / this.blogsPerPage + 1;
        if (isNaN(this.currentPage) || overPage || this.currentPage <= 0) {
          this.router.navigate(['./page/1'], { relativeTo: this.route });
        }
        this.store
          .pipe(
            select(fromBlog.getBlogCreateTimeAtPosition, {
              position: this.blogsPerPage * (this.currentPage - 1),
            }),
            filter((id: string) => !!id),
            takeUntil(this.destroy$)
          )
          .subscribe((id: string) => {
            this.store.dispatch(
              new BlogActions.LoadBlogsAtPage({ startAtId: id, limit: this.blogsPerPage })
            );
          });
      });
  }

  get pageNumbers(): number[] {
    let remaining: number = this.blogCount;
    const pageNumbersArray: number[] = [];
    let currentPage = 1;
    while (remaining > this.blogsPerPage) {
      pageNumbersArray.push(currentPage++);
      remaining -= this.blogsPerPage;
    }
    if (remaining > 0) {
      pageNumbersArray.push(currentPage++);
    }
    return pageNumbersArray;
  }

  previousPage(): void {
    this.router.navigate(['../', String(Number(this.currentPage) - 1)], { relativeTo: this.route });
  }

  nextPage(): void {
    this.router.navigate(['../', String(Number(this.currentPage) + 1)], { relativeTo: this.route });
  }

  get disablePrevious(): boolean {
    return this.currentPage === 1;
  }

  get disableNext(): boolean {
    return this.currentPage === this.pageNumbers[this.pageNumbers.length - 1];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
