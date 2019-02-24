import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { filter } from 'rxjs/operators/filter';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { get, parseInt, isNumber, forEach } from 'lodash';

import { Blog } from '../../model/blog';
import * as fromBlog from '../../reducer/index';
import * as BlogActions from '../../actions/blog.actions';
import { Repo } from '../../model/repo';
import * as defaultValues from '../../../shared/models/constants/default-values';
import { avaliableQueryParams } from '../../../shared/models/available-query-params';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  blogs$: Observable<Blog[]>;
  allBlogsCount: number;

  queryList: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadRepo());
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));

    combineLatest(
      this.store.pipe(select(fromBlog.getRepo)),
      this.route.queryParams
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(([repo, queryParams]: [Repo, Params]) => {
        console.log('queryParams', queryParams);
        this.queryList = this.blogService.buildQuery(queryParams);
        this.allBlogsCount = repo.openIssuesCount;
        const overPage: boolean =
          this.currentPage > this.allBlogsCount / this.perPage + 1;
        if (overPage || this.currentPage <= 0) {
          this.updateFilter('page', '1');
        }
        this.loadByFilter();
      });
  }

  get perPage(): number {
    return parseInt(
      get(this.queryList, 'per_page', defaultValues.blogsPerPage),
      10
    );
  }

  get currentPage(): number {
    return parseInt(get(this.queryList, 'page', '1'), 10);
  }

  get pageNumbers(): number[] {
    let remaining: number = this.allBlogsCount;
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

  updateFilter(query: string, value: string) {
    this.queryList[query] = value;
  }

  loadByFilter() {
    this.store.dispatch(new BlogActions.LoadBlogsWithQuery(this.queryList));
  }

  previousPage(): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: { page: String(this.currentPage - 1) }
    });
  }

  nextPage(): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: { page: String(this.currentPage + 1) }
    });
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
