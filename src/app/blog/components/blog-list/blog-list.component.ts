import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators/filter';

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
  blogCount: number;
  blogsPerPage: number = 3;
  currentPage: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) {
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
    this.store.pipe(select(fromBlog.getAllBlogCount)).subscribe((blogCount: number) => this.blogCount = blogCount);
  }

  ngOnInit(): void {
    this.store.dispatch(new BlogActions.LoadAllBlogsInfo());
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentPage = parseInt(params.get('pageNumber'));
      this.store.pipe(select(fromBlog.getBlogCreateTimeAtPosition, { position: this.blogsPerPage * (this.currentPage - 1) }))
        .pipe(filter((id: string) => !!id)).subscribe((id: string) => {
          this.store.dispatch(new BlogActions.LoadBlogsAtPage({ startAtId: id, limit: this.blogsPerPage }))
        });
    });
  }

  get pageNumbers(): number[] {
    let remaining: number = this.blogCount;
    let pageNumbersArray: number[] = [];
    let currentPage: number = 1;
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

}