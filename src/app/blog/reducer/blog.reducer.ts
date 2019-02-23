import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BlogActionsUnion, BlogActionTypes } from '../actions/blog.actions';

import { Blog } from '../model/blog';
import { Repo } from '../model/repo';

export interface State extends EntityState<Blog> {
  repo: Repo;
  selectedBlogId: number;
  errorMessage: HttpErrorResponse;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (issue: Blog) => issue.number,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  repo: new Repo({}),
  selectedBlogId: undefined,
  errorMessage: undefined,
});

export function reducer(state = initialState, action: BlogActionsUnion): State {
  switch (action.type) {
    case BlogActionTypes.LOAD_REPO_SUCCESS: {
      return {
        ...state,
        repo: action.payload,
        errorMessage: undefined,
      };
    }
    case BlogActionTypes.LOAD_BLOGS_AT_PAGE_SUCCESS: {
      console.log('all blogs', action.payload);
      return adapter.addMany(action.payload, {
        ...adapter.removeAll(state),
        errorMessage: undefined,
      });
    }
    case BlogActionTypes.LOAD_ONE_BLOG: {
      return { ...state, selectedBlogId: action.payload.blogNumber };
    }
    case BlogActionTypes.LOAD_ONE_BLOG_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedBlogId: action.payload.number,
        errorMessage: undefined,
      });
    }
    case BlogActionTypes.LOAD_BLOGS_AT_PAGE_FAIL:
    case BlogActionTypes.LOAD_REPO_FAIL:
    case BlogActionTypes.LOAD_ONE_BLOG_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
