import { Action } from '@ngrx/store';

import { Blog } from '../model/blog';
import { Repo } from '../model/repo';
import { HttpResponse } from '@angular/common/http';

export enum BlogActionTypes {
  LOAD_REPO = '[Blog] Load Repo',
  LOAD_REPO_SUCCESS = '[Blog] Load Repo Success',
  LOAD_REPO_FAIL = '[Blog] Load Repo Fail',

  LOAD_BLOGS_AT_PAGE = '[Blog] Load Blogs At Page',
  LOAD_BLOGS_AT_PAGE_SUCCESS = '[Blog] Load Blogs At Page Success',
  LOAD_BLOGS_AT_PAGE_FAIL = '[Blog] Load Blogs At Page Fail',

  LOAD_BLOGS_WITH_QUERY = '[Blog] Load Blogs With Query',
  LOAD_BLOGS_WITH_QUERY_SUCCESS = '[Blog] Load Blogs With Query Success',
  LOAD_BLOGS_WITH_QUERY_FAIL = '[Blog] Load Blogs With Query Fail',

  LOAD_ONE_BLOG = '[Blog] Load One Blog',
  LOAD_ONE_BLOG_SUCCESS = '[Blog] Load One Blog Success',
  LOAD_ONE_BLOG_FAIL = '[Blog] Load One Blog Fail',
}

export class LoadRepo implements Action {
  readonly type = BlogActionTypes.LOAD_REPO;
}

export class LoadRepoSUccess implements Action {
  readonly type = BlogActionTypes.LOAD_REPO_SUCCESS;

  constructor(public payload: Repo) {
  }
}

export class LoadRepoFail implements Action {
  readonly type = BlogActionTypes.LOAD_REPO_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadBlogsAtPage implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_AT_PAGE;

  constructor(public payload: { page: string, perPage: string }) {
  }
}

export class LoadBlogsAtPageSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_AT_PAGE_SUCCESS;

  constructor(public payload: Blog[]) {
  }
}

export class LoadBlogsAtPageFail implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_AT_PAGE_FAIL;

  constructor(public payload: string) {
  }
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

  constructor(public payload: string) {
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

  constructor(public payload: string) {
  }
}

export type BlogActionsUnion =
  | LoadRepo
  | LoadRepoSUccess
  | LoadRepoFail
  | LoadBlogsAtPage
  | LoadBlogsAtPageSuccess
  | LoadBlogsAtPageFail
  | LoadBlogsWithQuery
  | LoadBlogsWithQuerySuccess
  | LoadBlogsWithQueryFail
  | LoadOneBlog
  | LoadOneBlogSuccess
  | LoadOneBlogFail;
