import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { map as _map } from 'lodash';

import { Blog } from '../model/blog';
import {
  BlogActionTypes,
  LoadAllBlogsInfo,
  LoadAllBlogsInfoSuccess,
  LoadAllBlogsInfoFail,
  LoadOneBlog,
  LoadOneBlogSuccess,
  LoadOneBlogFail,
  LoadBlogsAtPage,
  LoadBlogsAtPageSuccess,
  LoadBlogsAtPageFail,
} from '../actions/blog.actions';
import { BlogService } from '../service/blog.service';

@Injectable()
export class BlogEffects {
  @Effect()
  loadAllBlogsInfo$: Observable<Action> = this.actions$.pipe(
    ofType<LoadAllBlogsInfo>(BlogActionTypes.LOAD_ALL_BLOGS_INFO),
    switchMap(() => {
      return this.blogService.loadAllBlogsInfo().pipe(
        map(
          (blogsInfo: { allBlogCount: number; allBlogCreateTimes: number[] }) =>
            new LoadAllBlogsInfoSuccess(blogsInfo)
        ),
        catchError((err: any) => of(new LoadAllBlogsInfoFail(err)))
      );
    })
  );

  @Effect()
  loadBlogsAtPage$: Observable<Action> = this.actions$.pipe(
    ofType<LoadBlogsAtPage>(BlogActionTypes.LOAD_BLOGS_AT_PAGE),
    map((action: LoadBlogsAtPage) => action.payload),
    switchMap((payload: { startAtId: string; limit: number }) => {
      return this.blogService.loadAtPage(payload.startAtId, payload.limit).pipe(
        map((blogs: Blog[]) => new LoadBlogsAtPageSuccess(blogs)),
        catchError((err: any) => of(new LoadBlogsAtPageFail(err)))
      );
    })
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((blogId: string) => {
      return this.blogService.loadOneBlog(blogId).pipe(
        map((blog: Blog) => {
          return new LoadOneBlogSuccess(blog);
        }),
        catchError((err: any) => {
          return of(new LoadOneBlogFail(err));
        })
      );
    })
  );

  constructor(private actions$: Actions, private blogService: BlogService) {}
}
