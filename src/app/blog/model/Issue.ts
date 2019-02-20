import * as dayjs from 'dayjs';
import { map } from 'lodash';

export class Issue {
  id: string;
  number: number;
  title: string;
  labels: string[];
  body: string;
  comments: number;
  createdAt: string;
  updatedAt: string;

  constructor(issue: any) {
    this.id = issue.id;
    this.number = issue.number;
    this.title = issue.title;
    this.body = issue.body;
    this.comments = issue.comments;
    this.labels = map(issue.labels, label => label.name);
    this.createdAt = issue.createdAt;
    this.updatedAt = issue.updatedAt;
  }

  get createdDateDisplay(): string {
    return dayjs(this.createdAt).format('MMM DD, YYYY');
  }

  get lastModifiedDisplay(): string {
    return dayjs(this.updatedAt).format('MMM DD, YYYY');
  }
}
