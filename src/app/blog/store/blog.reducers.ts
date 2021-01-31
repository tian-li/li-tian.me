import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { httpErrorResponseHandler } from '../../shared/functions/http-error-response-handler';
import { ErrorMessage } from '../../shared/models/error-message';
import { Blog } from '../model/blog';
import * as BlogActions from './blog.actions';

export interface State extends EntityState<Blog> {
  totalPage: number;
  selectedBlogId: number;
  errorMessage: ErrorMessage;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (issue: Blog) => issue.number,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  totalPage: undefined,
  selectedBlogId: undefined,
  errorMessage: undefined,
});

export const reducer = createReducer(
  initialState,
  on(BlogActions.loadBlogsWithQuery, BlogActions.loadOneBlog, (state) => {
    return {
      ...state,
      selectedBlogId: undefined,
      errorMessage: undefined,
    };
  }),
  on(BlogActions.loadBlogsWithQuerySuccess, (state, { blogs, list }) => {
    return adapter.addMany(blogs, {
      ...adapter.removeAll(state),
      errorMessage: undefined,
      totalPage: list ? parseInt(list['page'], 10) : state.totalPage,
    });
  }),
  on(BlogActions.loadOneBlogSuccess, (state, { blog }) => {
    return adapter.addOne(blog, {
      ...state,
      selectedBlogId: blog.number,
      errorMessage: undefined,
    });
  }),
  on(BlogActions.loadBlogsWithQueryFail, BlogActions.loadOneBlogFail, (state, { error }) => {
    return {
      ...state,
      errorMessage: httpErrorResponseHandler(error),
    };
  })
);
