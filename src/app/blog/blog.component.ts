import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlogGithubService } from './service/blog-github.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  public constructor(private titleService: Title, private gh: BlogGithubService) {
    this.titleService.setTitle('Blogs | Tian');
    this.gh.loadAllIssues().subscribe();
  }
}
