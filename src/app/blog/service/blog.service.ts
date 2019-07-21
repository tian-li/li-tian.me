import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { Github } from 'github-api';
import { map as _map, forEach, reduce, get } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromBlog from '../reducer/index';
import { githubConfig } from '../../../github-config';
import { Blog } from '../model/blog';
import * as defaultValues from '../../shared/models/constants/default-values';
import { avaliableQueryParams } from '../../shared/models/available-query-params';
import { ErrorMessage } from '../../shared/models/error-message';
import * as BlogActions from '../actions/blog.actions';

@Injectable()
export class BlogService {
  api = 'https://api.github.com/repos/tian-li/blog';
  // api: string = 'https://api.github.com/repos/angular/angular';

  githubConfig = {
    clientId: githubConfig.clientId,
    clientSecret: githubConfig.clientSecret,
    time: Date.now(),
  };
  params: HttpParams;

  // from ngrx/store
  blogs: Observable<Blog[]>;
  totalPage: Observable<number>;
  selectedBlogId: Observable<number>;
  selectedBlog: Observable<Blog>;
  errorMessage: Observable<ErrorMessage>;

  constructor(private http: HttpClient, private store: Store<fromBlog.State>) {
    this.blogs = this.store.pipe(select(fromBlog.getAllBlogs));
    this.totalPage = this.store.pipe(select(fromBlog.getTotalPage));
    this.selectedBlogId = this.store.pipe(select(fromBlog.getSelectedBlogId));
    this.selectedBlog = this.store.pipe(select(fromBlog.getSelectedBlog));
    this.errorMessage = this.store.pipe(select(fromBlog.getErrorMessage));

    this.params = new HttpParams()
      .set('client_id', this.githubConfig.clientId)
      .set('client_secret', this.githubConfig.clientSecret)
      .set('per_page', defaultValues.blogsPerPage)
      .set('creator', githubConfig.userName);
  }

  // dispathcers
  dispatchLoadBloagsWithQuery(queryList: Params): void {
    this.store.dispatch(new BlogActions.LoadBlogsWithQuery(queryList));
  }

  dispatchLoadOneBlog(payload: { blogNumber: number }): void {
    this.store.dispatch(new BlogActions.LoadOneBlog(payload));
  }

  loadBlogsByFilter(payload: { [key: string]: string }): Observable<HttpResponse<any>> {
    forEach(payload, (value: string, key: string) => {
      this.params = this.params.set(key, value);
    });
    return this.http.get(`${this.api}/issues`, {
      params: this.params,
      observe: 'response',
    });
  }

  loadOneBlog(issueNumber: number): Observable<Blog> {
    return this.http
      .get(`${this.api}/issues/${issueNumber}`, {
        params: this.params,
        observe: 'response',
      })
      .pipe(
        map((issue) => {
          return new Blog(issue.body);
        })
      );
  }

  buildQuery(queryParams: Params): { [key: string]: string } {
    return reduce(
      queryParams,
      (result: { [key: string]: string }, queryValue: string, queryKey: string) => {
        const query: { type: string } = get(avaliableQueryParams, queryKey);

        if (query) {
          switch (query.type) {
            case 'number': {
              if (parseInt(queryValue, 10)) {
                result[queryKey] = String(parseInt(queryValue, 10));
              }
              break;
            }
            case 'string': {
              result[queryKey] = queryValue;
              break;
            }
            default: {
              break;
            }
          }
        }
        return result;
      },
      {}
    );
  }
}
