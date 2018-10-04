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

  content: string;
  title: string;

  addNewPost() {
    this.fbService.addBlog({title: this.title, content: this.content});
  }

  loadAtPage() {
    let res = this.blogService.loadAtPage('2', 2);
    console.log('res', res)

    // res.then((value)=>{
    //   console.log('valye', value)
    // })
  }


}