import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

import { ScreenConfig } from './shared/models/screen-config';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  @ViewChild(MatSidenav, {static: false})
  sidenav: MatSidenav;

  watcher: Subscription;
  activeMediaQuery: string;
  screenConfig: ScreenConfig = {
    isMobile: false,
    sidenavOpened: true,
    sidenavMode: 'side',
  };

  // useNavBar = false;

  constructor(breakpointObserver: BreakpointObserver) {
    // breakpointObserver
    //   .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    //   .subscribe((result: BreakpointState) => {
    //     console.log("match result", result);

    //     if(result.matches) {
    //       this.useNavBar = true
    //     }
    //   });
  }



  toggleSideNav(): void {
    this.sidenav.toggle();
  }

  onRouteChanged(): void {
    if (this.screenConfig.isMobile) {
      this.sidenav.close();
    }
  }

  get mobileConfig(): ScreenConfig {
    return {
      isMobile: true,
      sidenavOpened: false,
      sidenavMode: 'push',
    };
  }

  get desktopConfig(): ScreenConfig {
    return {
      isMobile: false,
      sidenavOpened: true,
      sidenavMode: 'side',
    };
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }
}