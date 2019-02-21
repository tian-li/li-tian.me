import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Github } from 'github-api';
import { map as _map } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';

import { githubConfig } from '../../../github-config';
import { Blog } from '../model/blog';
import { Repo } from '../model/repo';

@Injectable()
export class BlogService {
  api: string = 'https://api.github.com/repos/tian-li/blog';
  // api: string = 'https://api.github.com/repos/angular/angular';

  githubConfig = {
    clientId: githubConfig.clientID,
    clientSecret: githubConfig.clientSecret,
    time: Date.now(),
  };

  params: HttpParams = new HttpParams()
  .set('client_id', this.githubConfig.clientId)
  .set('client_secret', this.githubConfig.clientSecret)

  constructor(private http: HttpClient) {
  }

  login() {
    this.http.get('https://github.com/login/oauth/authorize').subscribe((res) => {
      console.log('res', res);
    })
  }

  loadRepo(): Observable<Repo> {
    this.login();
    return this.http.get(this.api, {params: this.params}).pipe(
      map(repo => {
        return new Repo(repo);
      })
    );
  }

  loadBlogsAtPage(page: string, perPage: string): Observable<Blog[]> {
    this.params.set('page', page)
    .set('per_page', perPage)
    .set('creator', 'tian-li');
    return this.http.get(`${this.api}/issues`, { params: this.params }).pipe(
      map(issues => {
        return _map(issues, issue => new Blog(issue));
      })
    );
  }

  loadOneBlog(issueNumber: number): Observable<Blog> {
    console.log('');
    return this.http.get(`${this.api}/issues/${issueNumber}`).pipe(
      map(issue => {
        return new Blog(issue);
      })
    );
  }

}
