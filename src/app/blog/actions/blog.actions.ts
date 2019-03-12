import { Action } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';

import { Blog } from '../model/blog';

export enum BlogActionTypes {
  LOAD_BLOGS_WITH_QUERY = '[Blog] Load Blogs With Query',
  LOAD_BLOGS_WITH_QUERY_SUCCESS = '[Blog] Load Blogs With Query Success',
  LOAD_BLOGS_WITH_QUERY_FAIL = '[Blog] Load Blogs With Query Fail',

  LOAD_ONE_BLOG = '[Blog] Load One Blog',
  LOAD_ONE_BLOG_SUCCESS = '[Blog] Load One Blog Success',
  LOAD_ONE_BLOG_FAIL = '[Blog] Load One Blog Fail',
}

export class LoadBlogsWithQuery implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_WITH_QUERY;

  constructor(public payload: { [key: string]: string }) {
  }
}

export class LoadBlogsWithQuerySuccess implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_WITH_QUERY_SUCCESS;

  constructor(public payload: HttpResponse<Object>) {
  }
}

export class LoadBlogsWithQueryFail implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_WITH_QUERY_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadOneBlog implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG;

  constructor(public payload: { blogNumber: number }) {
  }
}

export class LoadOneBlogSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_SUCCESS;

  constructor(public payload: Blog) {
  }
}

export class LoadOneBlogFail implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_FAIL;

  constructor(public payload: any) {
  }
}

export type BlogActionsUnion =
  | LoadBlogsWithQuery
  | LoadBlogsWithQuerySuccess
  | LoadBlogsWithQueryFail
  | LoadOneBlog
  | LoadOneBlogSuccess
  | LoadOneBlogFail;
