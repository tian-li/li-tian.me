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
  LoadAllBlogsInfo,
  LoadAllBlogsInfoSuccess,
  LoadAllBlogsInfoFail,
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
  loadAllBlogsInfo$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogsInfo>(BlogActionTypes.LOAD_ALL_BLOGS_INFO),
    switchMap(() => {
      return this.blogService.loadAllBlogsInfo()
        .pipe(
          map((blogsInfo: { allBlogCount: number, allBlogIds: string[] }) => new LoadAllBlogsInfoSuccess(blogsInfo)),
          catchError((err: any) => of(new LoadAllBlogsInfoFail(err))),
        );
    }),
  );

  @Effect()
  loadBlogsAtPage$: Observable<Action> = this.actions$.pipe(
    ofType<LoadBlogsAtPage>(BlogActionTypes.LOAD_BLOGS_AT_PAGE),
    map((action: LoadBlogsAtPage) => action.payload),
    switchMap((payload: { startAtId: string, limit: number }) => {
      return this.blogService.loadAtPage(payload.startAtId, payload.limit)
        .pipe(
          map((blogs: Blog[]) => new LoadBlogsAtPageSuccess(blogs)),
          catchError((err: any) => of(new LoadBlogsAtPageFail(err))),
        );
    }),
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((blogId: string) => {
      return this.blogService.loadOneBlog(blogId)
        .pipe(
          map((blog: Blog) => new LoadOneBlogSuccess(blog)),
          catchError((err: any) => of(new LoadOneBlogFail(err))),
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