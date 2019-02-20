import { Action } from '@ngrx/store';

import { Issue } from '../model/issue';
import { Repo } from '../model/repo';

export enum IssueActionTypes {
  LOAD_REPO = '[Issue] Load Repo',
  LOAD_REPO_SUCCESS = '[Issue] Load Repo Success',
  LOAD_REPO_FAIL = '[Issue] Load Repo Fail',

  LOAD_ISSUES_AT_PAGE = '[Issue] Load Issues At Page',
  LOAD_ISSUES_AT_PAGE_SUCCESS = '[Issue] Load Issues At Page Success',
  LOAD_ISSUES_AT_PAGE_FAIL = '[Issue] Load Issues At Page Fail',

  LOAD_ONE_ISSUE = '[Issue] Load One Issue',
  LOAD_ONE_ISSUE_SUCCESS = '[Issue] Load One Issue Success',
  LOAD_ONE_ISSUE_FAIL = '[Issue] Load One Issue Fail',
}

export class LoadRepo implements Action {
  readonly type = IssueActionTypes.LOAD_REPO;
}

export class LoadRepoSUccess implements Action {
  readonly type = IssueActionTypes.LOAD_REPO_SUCCESS;

  constructor(public payload: Repo) {}
}

export class LoadRepoFail implements Action {
  readonly type = IssueActionTypes.LOAD_REPO_FAIL;

  constructor(public payload: any) {}
}

export class LoadIssuesAtPage implements Action {
  readonly type = IssueActionTypes.LOAD_ISSUES_AT_PAGE;

  constructor(public payload: { startAtId: string; limit: number }) {}
}

export class LoadIssuesAtPageSuccess implements Action {
  readonly type = IssueActionTypes.LOAD_ISSUES_AT_PAGE_SUCCESS;

  constructor(public payload: Issue[]) {}
}

export class LoadIssuesAtPageFail implements Action {
  readonly type = IssueActionTypes.LOAD_ISSUES_AT_PAGE_FAIL;

  constructor(public payload: string) {}
}

export class LoadOneIssue implements Action {
  readonly type = IssueActionTypes.LOAD_ONE_ISSUE;

  constructor(public payload: string) {}
}

export class LoadOneIssueSuccess implements Action {
  readonly type = IssueActionTypes.LOAD_ONE_ISSUE_SUCCESS;

  constructor(public payload: Issue) {}
}

export class LoadOneIssueFail implements Action {
  readonly type = IssueActionTypes.LOAD_ONE_ISSUE_FAIL;

  constructor(public payload: string) {}
}

export type IssueActionsUnion =
  | LoadRepo
  | LoadRepoSUccess
  | LoadRepoFail
  | LoadIssuesAtPage
  | LoadIssuesAtPageSuccess
  | LoadIssuesAtPageFail
  | LoadOneIssue
  | LoadOneIssueSuccess
  | LoadOneIssueFail;
