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
}
