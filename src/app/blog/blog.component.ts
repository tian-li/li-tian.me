import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { BlogService } from './service/blog.service';
import { ErrorMessage } from '../shared/models/error-message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  public constructor(
    private titleService: Title,
    private blogService: BlogService,
    private snackBar: MatSnackBar
  ) {
    this.titleService.setTitle('Blogs | Tian');
  }

  ngOnInit() {
    this.blogService.errorMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe((errorMessage: ErrorMessage) => {
        if (errorMessage) {
          this.openSnackBar(errorMessage.title, 'Dismiss');
        } else {
          this.dismissSnackBar();
        }
      });
  }

  openSnackBar(message: string, action: string) {
    if(!this.snackBarRef) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
  }

  dismissSnackBar() {
    if(this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  ngOnDestroy(): void {
    this.dismissSnackBar();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
