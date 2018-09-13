export class Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdDate: string;

  constructor(blog: any) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.authorId = blog.authorId;
    this.createdDate = blog.createdDate;
  }
}