import { Action } from '@ngrx/store';

import { Blog } from '../model/blog';

export enum BlogActionTypes {
  LOAD_ALL_BLOGS = '[Blog] Load All Blogs',
  LOAD_ALL_BLOGS_SUCCESS = '[Blog] Load All Blogs Success',
  LOAD_ALL_BLOGS_FAIL = '[Blog] Load All Blogs Fail',

  LOAD_MULTIPLE_BLOGS = '[Blog] Load Multiple Blogs',
  LOAD_MULTIPLE_BLOGS_SUCCESS = '[Blog] Load Multiple Blogs Success',
  LOAD_MULTIPLE_BLOGS_FAIL = '[Blog] Load Multiple Blogs Fail',

  LOAD_ONE_BLOG = '[Blog] Load One Blog',
  LOAD_ONE_BLOG_SUCCESS = '[Blog] Load One Blog Success',
  LOAD_ONE_BLOG_FAIL = '[Blog] Load One Blog Fail',
}

export class LoadAllBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS;
}

export class LoadAllBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_SUCCESS;

  constructor(public payload: Blog[]) {}
}

export class LoadAllBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_FAIL;

  constructor(public payload: string) {}
}

export class LoadMultipleBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS;
}

export class LoadMultipleBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS_SUCCESS;

  constructor(public payload: Blog[]) {}
}

export class LoadMultipleBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS_FAIL;

  constructor(public payload: string) {}
}

export class LoadOneBlog implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG;

  constructor(public payload: string) {}
}

export class LoadOneBlogSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_SUCCESS;

  constructor(public payload: Blog) {}
}

export class LoadOneBlogFail implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_FAIL;

  constructor(public payload: string) {}
}

export type BlogActionsUnion =
  | LoadAllBlogs
  | LoadAllBlogsSuccess
  | LoadAllBlogsFail
  | LoadMultipleBlogsSuccess
  | LoadMultipleBlogsFail
  | LoadMultipleBlogs
  | LoadOneBlog
  | LoadOneBlogSuccess
  | LoadOneBlogFail;