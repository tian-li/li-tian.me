import { Github } from 'github-api';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map'

import { githubConfig } from '../../../github-config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlogGithubService {
  api: string = 'https://api.github.com/repos/tian-li/blog';

  params = {
    clientId: githubConfig.clientID,
    clientSecret: githubConfig.clientSecret,
    time: Date.now(),
  };

  constructor(private http: HttpClient){
  }

  loadAllIssues() {

    return this.http.get(`${this.api}/issues`).pipe(
      map(issues => {
        console.log('issues', issues);
      })
    )
  }
  
}