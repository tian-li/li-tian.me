import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { BlogService } from './service/blog.service';
import { ErrorMessage } from '../shared/models/error-message';
import { takeUntil, delay } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  errorMessage: ErrorMessage;

  public constructor(
    private titleService: Title,
    private blogService: BlogService,
    private router: Router,
  ) {
    this.titleService.setTitle('Blogs | Tian');
  }

  ngOnInit():void {
    this.blogService.errorMessage
      .pipe(delay(0),takeUntil(this.destroy$))
      .subscribe((errorMessage: ErrorMessage) => {
        this.errorMessage = errorMessage;
      });
  }

  backToHome(): void {
    this.router.navigate(['blog']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
