import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Blog } from '../../../model/blog';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListItemComponent {

  @Input() blog: Blog;

  tagList(tags: string[]): string {
    return '';
  }
}
