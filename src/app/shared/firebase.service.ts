import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

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
    // this.blogCollectionRef.get().then((collection) => {
    //   collection.forEach(element => {
    //     console.log('doc', element.data());
    //   });
    // })
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

  addBlog(content) {
    let post = {
      title:'add',
      content: content,
      createdDate: '2018-09-26T20:18'
    }
    console.log('post', post);
    this.blogCollectionRef.add(post)
    .then((docRef) => {
      console.log('doc added', docRef);
    })
    .catch((err) => console.log('add doc err', err));
  }

}