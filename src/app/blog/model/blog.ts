export class Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdDate: string;
  summary: string;
  tags: string[];

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.summary = blog.summary;
    this.authorId = blog.authorId;
    this.createdDate = blog.createdDate;
    this.tags = blog.tags;
  }
}