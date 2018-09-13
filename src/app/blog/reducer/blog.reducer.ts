import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Blog } from '../model/blog';
import { BlogActionTypes, BlogActionsUnion } from '../actions/blog.actions';

export interface State extends EntityState<Blog> {
  // additional entities state properties
  errorMessage: string;
  // selectedBlogId: number | null;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (blog: Blog) => blog.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  errorMessage: undefined,
  // selectedBlogId: null,
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
    case BlogActionTypes.LOAD_ONE_BLOG_SUCCESS: {
      console.log('load one success action', action);

      return adapter.addOne(action.payload, { ...state, errorMessage: undefined });
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

// export const getSelectedBlogId = (state: State) => state.selectedBlogId;

// get the selectors
// const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// // select the array of blog ids
// export const selectBlogIds = selectIds;

// // select the dictionary of blog entities
// export const selectBlogEntities = selectEntities;

// // select the array of blogs
// export const selectAllBlogs = selectAll;

// // select the total blog count
// export const selectBlogTotal = selectTotal;