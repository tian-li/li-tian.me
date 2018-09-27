import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import * as _ from 'lodash';

import * as fromBlog from './reducer';
import { Blog } from './model/blog';
import * as BlogActions from './actions/blog.actions';
import { BlogService } from './service/blog.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent {
  constructor(private blogService: BlogService, private fbService: FirebaseService) { }

  ngOnInit() {
    // this.blogService.loadAllBlogs()
    // // .pipe(map((qs) => {
    // //   return _.map(qs.docs, doc => {
    // //     return new Blog({id: doc.id, ...doc.data()});
    // //   })
    // // }))
    // .subscribe((querySnapshot) => {
    //   console.log('from promise', querySnapshot);
    //   // querySnapshot.forEach((doc) => {
    //   //   console.log(doc.data());
    //   // });
    // })
  }

  content: string;

  addNewPost() {
    console.log('string', this.content);
    this.fbService.addBlog(this.content);
  }

  loadAtPage() {
    let res = this.blogService.loadAtPage(2, 2);
    console.log('res', res)

    // res.then((value)=>{
    //   console.log('valye', value)
    // })
  }


}