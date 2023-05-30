import { Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { Blog } from '../model/blog';

export const loadBlogsWithQuery = createAction(
  '[Blog] Load Blogs With Query',
  props<{ query: Params }>()
);

export const loadBlogsWithQuerySuccess = createAction(
  '[Blog] Load Blogs With Query Success',
  props<{ blogs: Blog[], list: Record<string, string> }>()
);

export const loadBlogsWithQueryFail = createAction(
  '[Blog] Load Blogs With Query Fail',
  props<{ error: any }>()
);

export const loadOneBlog = createAction(
  '[Blog] Load One Blog',
  props<{ blogNumber: number }>()
);

export const loadOneBlogSuccess = createAction(
  '[Blog] Load One Blog Success',
  props<{ blog: Blog }>()
);

export const loadOneBlogFail = createAction(
  '[Blog] Load One Blog Fail',
  props<{ error: any }>()
);
