import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { HttpResponse } from '@angular/common/http';

import {
  BlogActionTypes,
  LoadOneBlog,
  LoadOneBlogFail,
  LoadOneBlogSuccess,
  LoadBlogsWithQuery,
  LoadBlogsWithQuerySuccess,
  LoadBlogsWithQueryFail,
} from '../actions/blog.actions';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';

@Injectable()
export class BlogEffects {

  @Effect()
  loadBlogsWithQuery$: Observable<Action> = this.actions$.pipe(
    ofType<LoadBlogsWithQuery>(BlogActionTypes.LOAD_BLOGS_WITH_QUERY),
    map((action: LoadBlogsWithQuery) => action.payload),
    switchMap((payload: { [key: string]: string}) => {
      return this.blogService.loadBlogsByFilter(payload).pipe(
        map((response: HttpResponse<Object>) => new LoadBlogsWithQuerySuccess(response)),
        catchError((err: any) => of(new LoadBlogsWithQueryFail(err)))
      );
    })
  );

  @Effect()
  loadOneBlog$: Observable<Action> = this.actions$.pipe(
    ofType<LoadOneBlog>(BlogActionTypes.LOAD_ONE_BLOG),
    map((action: LoadOneBlog) => action.payload),
    switchMap((payload: { blogNumber: number }) => {
      return this.blogService.loadOneBlog(payload.blogNumber).pipe(
        map((blog: Blog) => {
          return new LoadOneBlogSuccess(blog);
        }),
        catchError((err: any) => {
          return of(new LoadOneBlogFail(err));
        })
      );
    })
  );

  constructor(private actions$: Actions, private blogService: BlogService) {
  }
}
