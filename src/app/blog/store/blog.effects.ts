import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { find, includes, map as _map, split } from 'lodash';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { extractQueryList } from '../../shared/functions/extract-query-list';
import { Blog } from '../model/blog';
import { BlogService } from '../service/blog.service';
import * as BlogActions from './blog.actions';

@Injectable()
export class BlogEffects {
  loadBlogsWithQuery$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BlogActions.loadBlogsWithQuery),
        switchMap(({ query }) => {
          return this.blogService.loadBlogsByFilter(query).pipe(
            map((response: HttpResponse<any>) => {
              const blogs = _map(response.body, (blog: any) => new Blog(blog));
              const lastPageLink: string = find(
                split(response.headers.get('Link'), ','),
                (link: string) => {
                  return includes(link, 'rel="last"');
                }
              );
              const list: Record<string, string> = lastPageLink ? extractQueryList(lastPageLink) : undefined;

              return BlogActions.loadBlogsWithQuerySuccess({ blogs, list });
            }),
            catchError((error: any) => of(BlogActions.loadBlogsWithQueryFail({ error })))
          );
        })
      )
  );

  loadOneBlog$ = createEffect(
    () => this.actions$.pipe(
      ofType(BlogActions.loadOneBlog),
      switchMap(({ blogNumber }) => {
        return this.blogService.loadOneBlog(blogNumber).pipe(
          map((blog: Blog) => {
            return BlogActions.loadOneBlogSuccess({ blog });
          }),
          catchError((error: any) => {
            return of(BlogActions.loadOneBlogFail({ error }));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private blogService: BlogService) {
  }
}
