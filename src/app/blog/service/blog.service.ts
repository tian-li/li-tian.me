import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';

import { Blog } from '../model/blog';
import * as fromBlog from '../reducer/blog.reducer';
import * as BlogActions from '../actions/blog.actions';
import { Observable } from 'rxjs';

@Injectable()
export class BlogService {
  blogs: Blog[];
  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store<fromBlog.State>) { }

  loadAllBlogs(): Observable<any> {
    return this.http.get(`${this.serverUrl}/blogs`);
  }

  loadOneBlog(blogId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/blogs/${blogId}`);
  }

  loadPage(page: string): Observable<any> {
    const params = new HttpParams().set('_page', page).set('_limit', '20');
    return this.http.get(`${this.serverUrl}/blogs`, { params });
  }
}