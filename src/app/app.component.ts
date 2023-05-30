import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private unsubcribe$ = new Subject();
  isDesktop = true;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe((result: BreakpointState) => {
        this.isDesktop = !result.matches;
      });
  }

  ngOnDestroy() {
    this.unsubcribe$.next(1);
    this.unsubcribe$.complete();
  }
}
