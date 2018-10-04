import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as dayjs from 'dayjs';
@Injectable()
export class FirebaseService {
  firestore;
  blogCollectionRef;
  constructor() {
    let config = {
      apiKey: "AIzaSyCZpIltWNZZcyXAARe74rqKQcbHsZ0FCa4",
      authDomain: "blog-rewrite.firebaseapp.com",
      databaseURL: "https://blog-rewrite.firebaseio.com",
      projectId: "blog-rewrite",
      storageBucket: "blog-rewrite.appspot.com",
      messagingSenderId: "396106547404"
    };
    firebase.initializeApp(config);
    this.firestore = firebase.firestore();
    this.firestore.settings({
      timestampsInSnapshots: true
    });
    this.blogCollectionRef = this.firestore.collection('blogs');
  }

  get db() {
    return this.firestore;
  }

  get blogsCollection() {
    return this.firestore.collection('blogs');
  }

  get blogRef() {
    return this.blogCollectionRef;
  }

  addBlog(blog: {title: string, content: string}) {
    let post = {
      title: blog.title,
      content: blog.content,
      createdDate: new Date().valueOf().toString(),
      // id: new Date().valueOf(),
    }
    console.log('post', post);
    this.blogCollectionRef.add(post)
    .then((docRef) => {
      console.log('doc added', docRef);
    })
    .catch((err) => console.log('add doc err', err));
  }

}