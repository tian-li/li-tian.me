import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { throwError } from 'rxjs';
import * as _ from 'lodash';

import { Blog } from '../model/blog';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class BlogService {
  blogsCollection;
  orderedBlogsCollection;

  constructor(private firebaseService: FirebaseService) {
    this.blogsCollection = firebaseService.blogsCollectionRef;
    this.orderedBlogsCollection = firebaseService.blogsCollectionRef.orderBy(
      'createdDate',
      'desc'
    );
  }

  loadAllBlogsInfo(): Observable<any> {
    return from(this.orderedBlogsCollection.get()).pipe(
      switchMap((querySnapshot: any) => {
        if (querySnapshot.empty) {
          return Observable.throw('Load failed');
        } else {
          return of({
            allBlogCount: querySnapshot.size,
            allBlogCreateTimes: _.map(
              querySnapshot.docs,
              (doc: any) => doc.data().createdDate
            ),
          });
        }
      })
    );
  }

  loadOneBlog(blogId: string): Observable<Blog | never> {
    return from(this.blogsCollection.doc(blogId).get()).pipe(
      switchMap((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          return of(new Blog({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          }));
        } else {
          return Observable.throw('Blog does not exist');
        }
      })
    );
  }

  loadAtPage(startAtId: string, numberPerPage: number): Observable<Blog[]> {
    return this.createObservable(
      this.orderedBlogsCollection
        .startAt(startAtId)
        .limit(numberPerPage)
        .get()
    );
  }

  createObservable(promise: any): Observable<Blog[]> {
    return from(promise).pipe(
      map((querySnapshot: any) =>
        _.map(
          querySnapshot.docs,
          doc => new Blog({ id: doc.id, ...doc.data() })
        )
      )
    );
  }
}
