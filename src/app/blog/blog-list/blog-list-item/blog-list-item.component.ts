import { Component, OnInit, Input } from '@angular/core';

import { Blog } from '../../model/blog';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss']
})
export class BlogListItemComponent implements OnInit {

  @Input() blog: Blog;

  constructor() { }

  ngOnInit() {
  }

}
