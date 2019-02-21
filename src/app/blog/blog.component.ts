import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Blogs | Tian');
  }
}
