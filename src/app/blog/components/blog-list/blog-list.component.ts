import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { get, parseInt, isEqual } from 'lodash';

import { Blog } from '../../model/blog';
import * as defaultValues from '../../../shared/models/constants/default-values';
import { BlogService } from '../../service/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['blog-list.component.scss'],
})
export class BlogListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  blogs$: Observable<Blog[]>;
  totalPage: number;
  queryList: Params = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogs$ = this.blogService.blogs;

    combineLatest(this.blogService.totalPage, this.route.queryParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([totalPage, queryParams]: [number, Params]) => {
        this.totalPage = totalPage;
        const query = this.blogService.buildQuery(queryParams);

        if (!this.totalPage) {
          this.loadByFilter();
        } else {
          if (!isEqual(this.queryList, query)) {
            this.queryList = query;

            if (this.currentPage > totalPage || this.currentPage <= 0) {
              this.updateFilter('page', '1');
            }

            this.loadByFilter();
          }
        }
      });
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  get perPage(): number {
    return parseInt(get(this.queryList, 'per_page', defaultValues.blogsPerPage), 10);
  }

  get currentPage(): number {
    return parseInt(get(this.queryList, 'page', '1'), 10);
  }

  get pageNumbers(): number[] {
    const pageNumbersArray: number[] = [];
    for (let i = 0; i < this.totalPage; i++) {
      pageNumbersArray.push(i + 1);
    }
    return pageNumbersArray;
  }

  updateFilter(query: string, value: string) {
    this.queryList[query] = value;
  }

  loadByFilter() {
    this.blogService.dispatchLoadBloagsWithQuery(this.queryList);
  }

  previousPage(): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: { page: String(this.currentPage - 1) },
    });
  }

  nextPage(): void {
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: { page: String(this.currentPage + 1) },
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
