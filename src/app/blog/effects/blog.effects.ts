import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  LoadBlogsAtPage,
  LoadBlogsAtPageSuccess,
  LoadBlogsAtPageFail,
  LoadAllBlogCount,
  LoadAllBlogCountSuccess,
  LoadAllBlogCountFail,
} from '../actions/blog.actions';
import { BlogService } from '../service/blog.service';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class BlogEffects {

  serverUrl: string = 'http://localhost:3000/blogs';

  @Effect()
  loadAllBlogCount$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogCount>(BlogActionTypes.LOAD_ALL_BLOG_COUNT),
    switchMap(() => {
      return this.blogService.loadAllBlogs()
        .pipe(
          map((blogs: Blog[]) => {
            return new LoadAllBlogCountSuccess(blogs.length);
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadAllBlogCountFail(err));
          }),
        );
    }),
  );

  @Effect()
  loadAllBlogs$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogs>(BlogActionTypes.LOAD_ALL_BLOGS),
    switchMap(() => {
      // return this.http.get(this.serverUrl)
      return this.blogService.loadAllBlogs()
        .pipe(
          map((blogs: Blog[]) => {
            console.log('all blogs', blogs)
            return new LoadAllBlogsSuccess(blogs);
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadAllBlogsFail(err));
          }),
        );
    }),
  );

  @Effect()
  loadBlogsAtPage$: Observable<Action> = this.actions$.pipe(
    ofType<LoadBlogsAtPage>(BlogActionTypes.LOAD_BLOGS_AT_PAGE),
    map((action: LoadBlogsAtPage) => action.payload),
    switchMap((payload: { pageNumber: number, limit: number }) => {
      // const params = new HttpParams().set('_page', payload.pageNumber).set('_limit', payload.limit);
      // return this.http.get(`${this.serverUrl}`, { params })
      return this.blogService.loadAtPage(payload.pageNumber, payload.limit)
        .pipe(
          map((blogs: Blog[]) => {
            return new LoadBlogsAtPageSuccess(blogs);
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadBlogsAtPageFail(err));
          }),
        );
    }),
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((blogId: string) => {
      // return this.http.get(`${this.serverUrl}/${blogId}`)
      return this.blogService.loadOneBlog(blogId)
        .pipe(
          map((blog: Blog) => {
            console.log('one blog', blog);
            // return new LoadOneBlogSuccess(new Blog(blog));
            return new LoadOneBlogSuccess(blog);
          }),
          catchError((err: any) => {
            console.log('err', err);
            return of(new LoadOneBlogFail(err));
          }),
        );
    }),
  )

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private blogService: BlogService, 
  ) { }
}