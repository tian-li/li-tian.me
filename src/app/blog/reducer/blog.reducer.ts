import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BlogActionsUnion, BlogActionTypes } from '../actions/blog.actions';
import { map, split, find, includes } from 'lodash';

import { Blog } from '../model/blog';
import { Repo } from '../model/repo';
import { extractQueryList } from '../../shared/functions/extract-query-list';
import { allowedLoadTimesPerSession } from '../../shared/models/constants/allowed-load-times-per-session';
import { httpErrorResponseHandler } from '../../shared/functions/http-error-response-handler';
import { ErrorMessage } from '../../shared/models/error-message';

export interface State extends EntityState<Blog> {
  repo: Repo;
  totalPage: number;
  selectedBlogId: number;
  loadCount: number;
  errorMessage: ErrorMessage;
}

export const adapter: EntityAdapter<Blog> = createEntityAdapter<Blog>({
  selectId: (issue: Blog) => issue.number,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  repo: new Repo({}),
  totalPage: undefined,
  selectedBlogId: undefined,
  loadCount: 0,
  errorMessage: undefined,
});

export function reducer(state = initialState, action: BlogActionsUnion): State {
  switch (action.type) {
    case BlogActionTypes.LOAD_BLOGS_AT_PAGE:
    case BlogActionTypes.LOAD_BLOGS_WITH_QUERY:
    case BlogActionTypes.LOAD_ONE_BLOG:
    case BlogActionTypes.LOAD_REPO: {
      if (state.loadCount > allowedLoadTimesPerSession) {
        return {
          ...state,
          loadCount: state.loadCount++,
          errorMessage: {
            title: 'Error',
            message: 'Exceeds api limit',
          }
        }
      }
      return {
        ...state,
        loadCount: state.loadCount++,
        errorMessage: undefined,
      }
    }
    case BlogActionTypes.LOAD_REPO_SUCCESS: {
      return {
        ...state,
        repo: action.payload,
        errorMessage: undefined,
      };
    }
    case BlogActionTypes.LOAD_BLOGS_WITH_QUERY_SUCCESS: {
      const response: HttpResponse<Object> = action.payload;
      const blogs: Blog[] = map(response.body, (blog: any) => new Blog(blog));
      const lastPageLink: string = find(
        split(response.headers.get('Link'), ','),
        (link: string) => {
          return includes(link, 'rel="last"');
        }
      );
      const list = lastPageLink ? extractQueryList(lastPageLink) : undefined;

      return adapter.addMany(blogs, {
        ...adapter.removeAll(state),
        errorMessage: undefined,
        totalPage: list ? parseInt(list.page, 10) : state.totalPage,
      });
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
      console.log('error', action.payload);
      return {
        ...state,
        errorMessage: httpErrorResponseHandler(action.payload),
      };
    }
    default: {
      return state;
    }
  }
}
