// import {
//   createSelector,
//   createFeatureSelector,
//   ActionReducerMap,
// } from '@ngrx/store';
// import * as fromBlog from '../blog/reducer/blog.reducer';

// export interface State {
//   blogs: fromBlog.BlogState;
// }

// export const reducers: ActionReducerMap<State> = {
//   blogs: fromBlog.reducer,
// };

// export const selectBlogState = createFeatureSelector<fromBlog.BlogState>('blogs');

// export const selectBlogIds = createSelector(
//   selectBlogState,
//   fromBlog.selectBlogIds
// );
// export const selectBlogEntities = createSelector(
//   selectBlogState,
//   fromBlog.selectBlogEntities
// );
// export const selectAllBlogs = createSelector(
//   selectBlogState,
//   fromBlog.selectAllBlogs
// );
// export const selectBlogTotal = createSelector(
//   selectBlogState,
//   fromBlog.selectBlogTotal
// );