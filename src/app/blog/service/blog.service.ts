import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { Github } from 'github-api';
import { map as _map, forEach, reduce, get } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

import { githubConfig } from '../../../github-config';
import { Blog } from '../model/blog';
import { Repo } from '../model/repo';
import * as defaultValues from '../../shared/models/constants/default-values';
import { avaliableQueryParams } from '../../shared/models/available-query-params';

@Injectable()
export class BlogService {
  api: string = 'https://api.github.com/repos/tian-li/blog';
  // api: string = 'https://api.github.com/repos/angular/angular';

  githubConfig = {
    clientId: githubConfig.clientId,
    clientSecret: githubConfig.clientSecret,
    time: Date.now(),
  };
  params: HttpParams;
  loadCount: number = 0;

  constructor(private http: HttpClient) {
    this.params = new HttpParams()
      // .set('client_id', this.githubConfig.clientId)
      // .set('client_secret', this.githubConfig.clientSecret)
      .set('per_page', defaultValues.blogsPerPage)
      .set('creator', githubConfig.userName);
  }

  loadRepo(): Observable<Repo> {
    if (this.loadCount >= 300) {
      return;
    }
    this.loadCount++;

    return this.http.get(this.api, { params: this.params }).pipe(
      map((repo) => {
        return new Repo(repo);
      })
    );
  }

  loadBlogsAtPage(page: string, perPage: string): Observable<Blog[]> {
    if (this.loadCount >= 300) {
      return;
    }
    this.loadCount++;

    this.params = this.params
      .set('page', page)
      .set('per_page', perPage ? perPage : defaultValues.blogsPerPage);

    return this.http.get(`${this.api}/issues`, { params: this.params }).pipe(
      map((issues) => {
        return _map(issues, (issue) => new Blog(issue));
      })
    );
  }

  loadBlogsByFilter(payload: { [key: string]: string }): Observable<HttpResponse<Object>> {
    if (this.loadCount >= 300) {
      return;
    }

    this.loadCount++;

    forEach(payload, (value: string, key: string) => {
      this.params = this.params.set(key, value);
    });
    return this.http.get(`${this.api}/issues`, {
      params: this.params,
      observe: 'response',
    });
  }

  loadOneBlog(issueNumber: number): Observable<Blog> {
    if (this.loadCount >= 300) {
      return;
    }
    this.loadCount++;

    return this.http.get(`${this.api}/issues/${issueNumber}`).pipe(
      map((issue) => {
        return new Blog(issue);
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
