import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { map } from 'lodash';

import { Blog } from '../model/blog';
import * as fromBlog from '../reducer/blog.reducer';
import * as BlogActions from '../actions/blog.actions';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class BlogService {
  blogs: Blog[];
  serverUrl: string = 'http://localhost:3000';
  blogsCollection;

  constructor(
    private http: HttpClient,
    private store: Store<fromBlog.State>,
    private firebaseService: FirebaseService
  ) {
    this.blogsCollection = firebaseService.db.collection('blogs');
  }

  loadAllBlogs() {
    // from firebase
    this.blogsCollection.get().then((querySnapshot) => {
      let blogsres = map(querySnapshot.docs, (doc) => {
        return new Blog({id: doc.id, ...doc.data()});
      });
      console.log('blog from fb', blogsres);
    });

    // from http
    // return this.http.get(`${this.serverUrl}/blogs`);
  }

  loadOneBlog(blogId: string): Observable<any> {
    return this.http.get(`${this.serverUrl}/blogs/${blogId}`);
  }

  loadPage(page: string): Observable<any> {
    const params = new HttpParams().set('_page', page).set('_limit', '20');
    return this.http.get(`${this.serverUrl}/blogs`, { params });
  }
}