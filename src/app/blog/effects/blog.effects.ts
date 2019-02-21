import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

import {
  BlogActionTypes,
  LoadBlogsAtPage,
  LoadBlogsAtPageFail,
  LoadBlogsAtPageSuccess,
  LoadOneBlog,
  LoadOneBlogFail,
  LoadOneBlogSuccess,
  LoadRepo,
  LoadRepoFail,
  LoadRepoSUccess,
} from '../actions/blog.actions';
import { Blog } from '../model/blog';
import { Repo } from '../model/repo';
import { BlogService } from '../service/blog.service';

@Injectable()
export class BlogEffects {
  @Effect()
  loadRepo$: Observable<Action> = this.actions$.pipe(
    ofType<LoadRepo>(BlogActionTypes.LOAD_REPO),
    switchMap(() => {
      return this.blogService.loadRepo().pipe(
        map(
          (repo: Repo) =>
            new LoadRepoSUccess(repo)
        ),
        catchError((err: any) => of(new LoadRepoFail(err)))
      );
    })
  );

  @Effect()
  loadBlogsAtPage$: Observable<Action> = this.actions$.pipe(
    ofType<LoadBlogsAtPage>(BlogActionTypes.LOAD_BLOGS_AT_PAGE),
    map((action: LoadBlogsAtPage) => action.payload),
    switchMap((payload: { page: string, perPage:string }) => {
      return this.blogService.loadBlogsAtPage(payload.page, payload.perPage).pipe(
        map((blogs: Blog[]) => new LoadBlogsAtPageSuccess(blogs)),
        catchError((err: any) => of(new LoadBlogsAtPageFail(err)))
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
