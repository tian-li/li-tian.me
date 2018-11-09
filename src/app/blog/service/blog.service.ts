import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { map as _map } from 'lodash';

import { Blog } from '../model/blog';
import { FirebaseService } from '../../shared/firebase.service';

@Injectable()
export class BlogService {
  blogsCollection;
  orderedNonDraftBlogsCollection;

  constructor(private firebaseService: FirebaseService) {
    this.blogsCollection = firebaseService.blogsCollectionRef;

    this.orderedNonDraftBlogsCollection = firebaseService.blogsCollectionRef
      .where('isDraft', '==', false)
      .orderBy('createdDate', 'desc');
  }

  loadAllBlogsInfo(): Observable<any> {
    return from(this.orderedNonDraftBlogsCollection.get()).pipe(
      switchMap((querySnapshot: any) => {
        if (querySnapshot.empty) {
          return Observable.throw('Load failed');
        } else {
          return of({
            allBlogCount: querySnapshot.size,
            allBlogCreateTimes: _map(querySnapshot.docs, (doc: any) => doc.data().createdDate),
          });
        }
      })
    );
  }

  loadOneBlog(blogId: string): Observable<Blog | never> {
    return from(this.blogsCollection.doc(blogId).get()).pipe(
      switchMap((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          return of(
            new Blog({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            })
          );
        } else {
          return Observable.throw('Blog does not exist');
        }
      })
    );
  }

  loadAtPage(startAtId: string, numberPerPage: number): Observable<Blog[]> {
    return this.createObservable(
      this.orderedNonDraftBlogsCollection
        .startAt(startAtId)
        .limit(numberPerPage)
        .get()
    );
  }

  createObservable(promise: any): Observable<Blog[]> {
    return from(promise).pipe(
      map((querySnapshot: any) =>
        _map(querySnapshot.docs, (doc) => new Blog({ id: doc.id, ...doc.data() }))
      )
    );
  }
}
