import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BlogActionsUnion, BlogActionTypes } from '../actions/blog.actions';
import { map, split, last, find, includes } from 'lodash';

import { Blog } from '../model/blog';
import { Repo } from '../model/repo';
import { extractQueryList } from '../../shared/functions/extract-query-list';

export interface State extends EntityState<Blog> {
  repo: Repo;
  totalPage: number;
  selectedBlogId: number;
  errorMessage: HttpErrorResponse;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (issue: Blog) => issue.number,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  repo: new Repo({}),
  totalPage: undefined,
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
    case BlogActionTypes.LOAD_BLOGS_WITH_QUERY_SUCCESS: {
      const response: HttpResponse<Object> = action.payload;
      const blogs: Blog[] = map(response.body, (blog) => new Blog(blog));
      const lastPageLink: string = find(split(response.headers.get('Link'), ','), (link: string) => {
        return includes(link, 'rel="last"');
      });
      console.log('lastPageLink', lastPageLink);
      const list = extractQueryList(lastPageLink);
      console.log('list', list);

      return adapter.addMany(blogs, {
        ...adapter.removeAll(state),
        errorMessage: undefined,
        totalPage: parseInt(list.page, 10)
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
    case BlogActionTypes.LOAD_BLOGS_WITH_QUERY_FAIL:
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
