import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { map, get } from 'lodash';

import * as BlogDb from '../../../mock-data/blogs.json';
import { Blog } from '../model/blog';
import * as fromBlog from '../reducer/blog.reducer';
import * as BlogActions from '../actions/blog.actions';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class BlogService {
  blogs: Blog[];
  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private store: Store<fromBlog.State>) { 
    // this.blogs = map(get(BlogDb, 'default.blogs'), (blog: any) => new Blog(blog));
    // console.log('blogs', this.blogs);
    // this.http.get(`${this.serverUrl}/blogs`).subscribe((v)=>console.log('v', v));
  }

  loadAllBlogs(): Observable<any> {
    return this.http.get(`${this.serverUrl}/blogs`);

    // this.blogs = map(get(BlogDb, 'blogs'), (blog: any) => new Blog(blog));
    // return of(this.blogs);
  }

  loadOneBlog(blogId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/blogs/${blogId}`);
  }
}