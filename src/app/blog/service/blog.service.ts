import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import * as _ from 'lodash';

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
    this.blogsCollection = firebaseService.db.collection('blogs').orderBy('order');
  }

  loadAllBlogs(): Observable<Blog[]> {
    // from firebase
    return from(this.blogsCollection.get())
      .pipe(
        filter((querySnapshot: any) => querySnapshot.docs.length > 0),
        map((querySnapshot: any) => _.map(querySnapshot.docs, doc => new Blog({ id: doc.id, ...doc.data() }))));

    // from http
    // return this.http.get(`${this.serverUrl}/blogs`);
  }

  loadOneBlog(blogId: string): Observable<Blog> {
    // from firebase
    return from(this.blogsCollection.doc(blogId).get())
      .pipe(
        map((documentSnapshot: any) => new Blog({ id: documentSnapshot.id, ...documentSnapshot.data() })));

    // from http
    // return this.http.get(`${this.serverUrl}/blogs/${blogId}`);
  }

  loadPage(page: string): Observable<any> {
    const params = new HttpParams().set('_page', page).set('_limit', '20');
    return this.http.get(`${this.serverUrl}/blogs`, { params });
  }

  loadAtPage(pageNumber: number, numberPerPage: number = 5) {
    let first = this.blogsCollection.limit(numberPerPage).get();
    if (pageNumber === 1) {
      return from(first);
    } else {
      this.blogsCollection.limit((pageNumber - 1) * numberPerPage).get()
    }


    // if (!lastVisibleBlogId) {
    //   return from(this.blogsCollection.limit(numberPerPage).get());
    // } else {
    //   return from(this.blogsCollection.startAfter(lastVisibleBlogId).limit(numberPerPage));
    // }


    // let next = this.blogsCollection
    //   .startAfter(lastVisibleBlogId)
    //   .limit(numberPerPage);
    // next.get().then((ds) => {
    //   console.log('next ds', ds)
    // })
    // });
  }
}