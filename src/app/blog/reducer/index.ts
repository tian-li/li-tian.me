import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromBlog from './blog.reducer';

export interface BlogState {
  blogs: fromBlog.State;
}

export interface State {
  blogs: BlogState;
}

export const reducers: ActionReducerMap<BlogState> = {
  blogs: fromBlog.reducer,
};

export const getBlogsState = createFeatureSelector<BlogState>('blogs');

export const getBlogEntitiesState = createSelector(
  getBlogsState,
  state => state.blogs
);

export const {
  selectIds: getBlogIds,
  selectEntities: getBlogEntities,
  selectAll: getAllBlogs,
  selectTotal: getTotalBlogs,
} = fromBlog.adapter.getSelectors(getBlogEntitiesState);

export const getSelectedBlogId = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.selectedBlogId
);

export const getSelectedBlog = createSelector(
  getBlogEntities,
  getSelectedBlogId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getErrorMessage = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.errorMessage
);

export const getTotalPage = createSelector(
  getBlogEntitiesState,
  fromBlogs => fromBlogs.totalPage
);
