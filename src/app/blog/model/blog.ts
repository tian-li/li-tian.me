import * as dayjs from 'dayjs';
import { map } from 'lodash';

import { Label } from './label';

export class Blog {
  id: string;
  number: number;
  title: string;
  labels: Label[];
  body: string;
  comments: number;
  createdAt: string;
  updatedAt: string;

  constructor(blog: any) {
    this.id = blog.id;
    this.number = blog.number;
    this.title = blog.title;
    this.body = blog.body;
    this.comments = blog.comments;
    this.labels = map(blog.labels, label => new Label(label));
    this.createdAt = blog.created_at;
    this.updatedAt = blog.updated_at;
  }

  get createdDateDisplay(): string {
    return dayjs(this.createdAt).format('MMM DD, YYYY');
  }

  get lastModifiedDisplay(): string {
    return dayjs(this.updatedAt).format('MMM DD, YYYY');
  }
}
