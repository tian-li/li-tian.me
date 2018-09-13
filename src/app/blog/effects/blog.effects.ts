import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { map as _map } from 'lodash';

import { Blog } from '../model/blog';
import {
  BlogActionTypes,
  LoadAllBlogs,
  LoadAllBlogsSuccess,
  LoadAllBlogsFail,
  LoadMultipleBlogsSuccess,
  LoadMultipleBlogsFail,
  LoadMultipleBlogs,
  LoadOneBlog,
  LoadOneBlogSuccess,
  LoadOneBlogFail,
} from '../actions/blog.actions';
import { BlogService } from '../service/blog.service';

@Injectable()
export class BlogEffects {

  serverUrl: string = 'http://localhost:3000/blogs';

  @Effect()
  loadAllBlogs$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogs>(BlogActionTypes.LOAD_ALL_BLOGS),
    switchMap(() => {
      return this.http.get(this.serverUrl)
        .pipe(
          map((blogs: any) => {
            return new LoadAllBlogsSuccess(_map(blogs, (blog: any) => new Blog(blog)));
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadAllBlogsFail(err));
          }),
        );
    }),
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((blogId: string) => {
      return this.http.get(`${this.serverUrl}/${blogId}`)
        .pipe(
          map((blog: any) => {
            console.log('one blog', blog);
            return new LoadOneBlogSuccess(new Blog(blog));
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadOneBlogFail(err));
          }),
        );
    }),
  )

  constructor(private http: HttpClient, private actions$: Actions, private blogService: BlogService) { }
}