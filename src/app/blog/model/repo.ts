export class Repo {
  openIssuesCount: number;

  constructor(repo: any) {
    this.openIssuesCount = repo.open_issues_count;
  }
}