import { Action } from '@ngrx/store';

import { Blog } from '../model/blog';

export enum BlogActionTypes {
  LOAD_ALL_BLOG_COUNT = '[Blog] Load All Blog Count',
  LOAD_ALL_BLOG_COUNT_SUCCESS = '[Blog] Load All Blog Count Success',
  LOAD_ALL_BLOG_COUNT_FAIL = '[Blog] Load All Blog Count Fail',


  LOAD_ALL_BLOGS = '[Blog] Load All Blogs',
  LOAD_ALL_BLOGS_SUCCESS = '[Blog] Load All Blogs Success',
  LOAD_ALL_BLOGS_FAIL = '[Blog] Load All Blogs Fail',

  LOAD_MULTIPLE_BLOGS = '[Blog] Load Multiple Blogs',
  LOAD_MULTIPLE_BLOGS_SUCCESS = '[Blog] Load Multiple Blogs Success',
  LOAD_MULTIPLE_BLOGS_FAIL = '[Blog] Load Multiple Blogs Fail',

  LOAD_BLOGS_FROM_PAGE = '[Blog] Load Blogs From Page',
  LOAD_BLOGS_FROM_PAGE_SUCCESS = '[Blog] Load Blogs From Page Success',
  LOAD_BLOGS_FROM_PAGE_FAIL = '[Blog] Load Blogs From Page Fail',

  LOAD_ONE_BLOG = '[Blog] Load One Blog',
  LOAD_ONE_BLOG_SUCCESS = '[Blog] Load One Blog Success',
  LOAD_ONE_BLOG_FAIL = '[Blog] Load One Blog Fail',
}

export class LoadAllBlogCount implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOG_COUNT;
}

export class LoadAllBlogCountSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOG_COUNT_SUCCESS;

  constructor(public payload: number) { }
}

export class LoadAllBlogCountFail implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOG_COUNT_FAIL;

  constructor(public payload: string) { }
}

export class LoadAllBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS;
}

export class LoadAllBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_SUCCESS;

  constructor(public payload: Blog[]) { }
}

export class LoadAllBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_ALL_BLOGS_FAIL;

  constructor(public payload: string) { }
}

export class LoadMultipleBlogs implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS;
}

export class LoadMultipleBlogsSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS_SUCCESS;

  constructor(public payload: Blog[]) { }
}

export class LoadMultipleBlogsFail implements Action {
  readonly type = BlogActionTypes.LOAD_MULTIPLE_BLOGS_FAIL;

  constructor(public payload: string) { }
}

export class LoadBlogsFromPage implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_FROM_PAGE;

  constructor(public payload: { pageNumber: string, limit: string }) { }
}

export class LoadBlogsFromPageSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_FROM_PAGE_SUCCESS;

  constructor(public payload: Blog[]) { }
}

export class LoadBlogsFromPageFail implements Action {
  readonly type = BlogActionTypes.LOAD_BLOGS_FROM_PAGE_FAIL;

  constructor(public payload: string) { }
}

export class LoadOneBlog implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG;

  constructor(public payload: string) { }
}

export class LoadOneBlogSuccess implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_SUCCESS;

  constructor(public payload: Blog) { }
}

export class LoadOneBlogFail implements Action {
  readonly type = BlogActionTypes.LOAD_ONE_BLOG_FAIL;

  constructor(public payload: string) { }
}

export type BlogActionsUnion =
  |LoadAllBlogCount
  | LoadAllBlogCountSuccess
  | LoadAllBlogCountFail
  | LoadAllBlogs
  | LoadAllBlogsSuccess
  | LoadAllBlogsFail
  | LoadMultipleBlogsSuccess
  | LoadMultipleBlogsFail
  | LoadMultipleBlogs
  | LoadBlogsFromPage
  | LoadBlogsFromPageSuccess
  | LoadBlogsFromPageFail
  | LoadOneBlog
  | LoadOneBlogSuccess
  | LoadOneBlogFail;
