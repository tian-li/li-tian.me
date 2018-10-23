import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { firebaseConfig } from '../../firebase-config';

@Injectable()
export class FirebaseService {
  firestore;
  blogCollectionRef;
  constructor() {
    
    firebase.initializeApp(firebaseConfig);
    this.firestore = firebase.firestore();
    this.firestore.settings({ timestampsInSnapshots: true });
  }

  get db() {
    return this.firestore;
  }

  get blogsCollectionRef() {
    return this.firestore.collection('blogs');
  }

  addBlog(blog: { title: string, content: string }) {
    const post: any = {
      title: blog.title,
      content: blog.content,
      createdDate: new Date().valueOf(),
    };
    console.log('post', post);
    this.blogCollectionRef.add(post)
      .then((docRef) => {
        console.log('doc added', docRef);
      })
      .catch((err) => console.log('add doc err', err));
  }
}
