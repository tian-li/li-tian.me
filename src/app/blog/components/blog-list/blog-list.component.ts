import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  blogsPerPage: number = 5;
  currentPage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromBlog.State>,
  ) {
    this.blogs$ = this.store.pipe(select(fromBlog.getAllBlogs));
    this.store.pipe(select(fromBlog.getAllBlogCount)).subscribe((blogCount:number) => this.blogCount = blogCount);
  }

  ngOnInit() {
    this.store.dispatch(new BlogActions.LoadAllBlogCount());
    this.route.paramMap.subscribe((params: ParamMap) =>{
      this.currentPage = params.get('pageNumber');
      console.log('current page', params.get('pageNumber'));
      this.store.dispatch(new BlogActions.LoadBlogsFromPage({pageNumber: this.currentPage, limit: this.blogsPerPage + '' }))
    });
  }

  get pageNumbers(): string[] {
    let remaining: number = this.blogCount;
    let pageNumbersArray: string[] = [];
    let currentPage: number = 1;
    while (remaining > this.blogsPerPage) {
      pageNumbersArray.push(String(currentPage++));
      remaining -= this.blogsPerPage;
    }
    if (remaining > 0) {
      pageNumbersArray.push(String(currentPage++));
    }
    return pageNumbersArray;
  }

  previousPage(): void {
    this.router.navigate(['../', String(Number(this.currentPage) - 1)], { relativeTo: this.route });
  }

  nextPage(): void {
  
    this.router.navigate(['../', String(Number(this.currentPage) + 1)], { relativeTo: this.route });
  }

  checkPage() {
    console.log('current page', this.currentPage);
    console.log('current page type', typeof this.currentPage);
    console.log('pagenumbers', this.pageNumbers);
    console.log('is fisrt', this.currentPage === '1');
    // console.log('is last', this.currentPage === this.pageNumbers.slice(-1))
  }

  get disablePrevious(): boolean {
    return this.currentPage === '1';
  }

  get disableNext(): boolean {
    return this.currentPage === this.pageNumbers[this.pageNumbers.length - 1];
  }

}