import * as dayjs from 'dayjs';
import { map } from 'lodash';

export class Blog {
  id: string;
  number: number;
  title: string;
  labels: string[];
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
    this.labels = map(blog.labels, label => label.name);
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
