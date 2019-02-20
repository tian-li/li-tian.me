import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Issue } from '../model/issue';
import { IssueActionTypes, IssueActionsUnion } from '../actions/issue.actions';
import { Repo } from '../model/repo';

export interface State extends EntityState<Issue> {
  repo: Repo;
  errorMessage: string;
  selectedIssueId: string;
}

export const adapter: EntityAdapter<Issue> = createEntityAdapter<Issue>({
  selectId: (issue: Issue) => issue.number,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  repo: undefined,
  errorMessage: undefined,
  selectedIssueId: undefined,
});

export function reducer(state = initialState, action: IssueActionsUnion): State {
  switch (action.type) {
    case IssueActionTypes.LOAD_REPO_SUCCESS: {
      return {
        ...state,
        repo: action.payload,
        errorMessage: undefined,
      };
    }
    case IssueActionTypes.LOAD_ISSUES_AT_PAGE_SUCCESS: {
      return adapter.addMany(action.payload, {
        ...adapter.removeAll(state),
        errorMessage: undefined,
      });
    }
    case IssueActionTypes.LOAD_ONE_ISSUE: {
      return { ...state, selectedIssueId: action.payload };
    }
    case IssueActionTypes.LOAD_ONE_ISSUE_SUCCESS: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedIssueId: action.payload.id,
        errorMessage: undefined,
      });
    }
    case IssueActionTypes.LOAD_ISSUES_AT_PAGE_FAIL:
    case IssueActionTypes.LOAD_REPO_FAIL:
    case IssueActionTypes.LOAD_ONE_ISSUE_FAIL: {
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

export const getSelectedIssueId = (state: State) => state.selectedIssueId;
export const getRepo = (state: State) => state.repo;
