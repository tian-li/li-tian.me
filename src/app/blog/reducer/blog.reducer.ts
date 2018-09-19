import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Blog } from '../model/blog';
import { BlogActionTypes, BlogActionsUnion } from '../actions/blog.actions';

export interface State extends EntityState<Blog> {
  errorMessage: string;
  selectedBlogId: string;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (blog: Blog) => blog.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  errorMessage: undefined,
  selectedBlogId: undefined,
});

export function reducer(state = initialState, action: BlogActionsUnion): State {
  switch (action.type) {
    case BlogActionTypes.LOAD_ALL_BLOGS_SUCCESS: {
      console.log('load all success action', action);
      return adapter.addMany(action.payload, { ...state, errorMessage: undefined });
    }
    case BlogActionTypes.LOAD_ALL_BLOGS_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case BlogActionTypes.LOAD_MULTIPLE_BLOGS_SUCCESS: {
      return adapter.addMany(action.payload, { ...state, errorMessage: undefined });
    }
    case BlogActionTypes.LOAD_MULTIPLE_BLOGS_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case BlogActionTypes.LOAD_BLOGS_FROM_PAGE_SUCCESS: {
      console.log('load from page success action', action);
      return adapter.addMany(action.payload, { ...state, errorMessage: undefined });
    }
    case BlogActionTypes.LOAD_BLOGS_FROM_PAGE_FAIL: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case BlogActionTypes.LOAD_ONE_BLOG_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedBlogId: action.payload.id,
        errorMessage: undefined,
      });
    }
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

export const getSelectedBlogId = (state: State) => state.selectedBlogId;
