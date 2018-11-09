import * as dayjs from 'dayjs';

export class Blog {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  summary: string;
  tags: string[];
  lastModified: string;
  isDraft: boolean;

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.summary = blog.summary;
    this.createdDate = blog.createdDate;
    this.lastModified = blog.lastModified;
    if (!!blog.tags) {
      this.tags = blog.tags;
    } else {
      this.tags = [];
    }
    this.isDraft = blog.isDraft === true ? true : false;
  }

  get createdDateDisplay(): string {
    return dayjs(this.createdDate).format('MMM DD, YYYY');
  }

  get lastModifiedDisplay(): string {
    return dayjs(this.lastModified).format('MMM DD, YYYY');
  }
}
