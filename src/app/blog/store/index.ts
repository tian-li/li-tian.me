import { ActionReducerMap, } from '@ngrx/store';
import * as fromBlog from './blog.reducers';

export interface BlogState {
  blogs: fromBlog.State;
}

export interface State {
  blogs: BlogState;
}

export const reducers: ActionReducerMap<BlogState> = {
  blogs: fromBlog.reducer,
};

export * from './blog.actions';
export * from './blog.reducers';
export * from './blog.selectors';
