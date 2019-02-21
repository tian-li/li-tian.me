import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer/index';
import * as BlogActions from '../../actions/blog.actions';
import { Repo } from '../../model/repo';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  currentPage: number;
  issues$: Observable<Blog[]>;
  openBlogsCount: number;
  perPage = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadRepo());
    this.issues$ = this.store.pipe(select(fromBlog.getAllBlogs));

    combineLatest(this.store.pipe(select(fromBlog.getRepo)), this.route.paramMap)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([repo, params]: [Repo, ParamMap]) => {
        this.currentPage = parseInt(params.get('pageNumber'), 10);
        this.openBlogsCount = repo.openIssuesCount;
        const overPage: boolean = this.currentPage > this.openBlogsCount / this.perPage + 1;
        if (isNaN(this.currentPage) || overPage || this.currentPage <= 0) {
          this.router.navigate(['./page/1'], { relativeTo: this.route });
        }
        this.store.dispatch(
          new BlogActions.LoadBlogsAtPage({ page: String(this.currentPage), perPage: String(this.perPage) })
        );
      });
  }

  get pageNumbers(): number[] {
    let remaining: number = this.openBlogsCount;
    const pageNumbersArray: number[] = [];
    let currentPage = 1;
    while (remaining > this.perPage) {
      pageNumbersArray.push(currentPage++);
      remaining -= this.perPage;
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
