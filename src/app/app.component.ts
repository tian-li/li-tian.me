import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';

import { ScreenConfig } from './shared/models/screen-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  watcher: Subscription;
  activeMediaQuery: string;
  screenConfig: ScreenConfig = {
    isMobile: false,
    sidenavOpened: true,
    sidenavMode: 'side',
  };

  constructor(public media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change
        ? `'${change.mqAlias}' = (${change.mediaQuery})`
        : '';
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        this.screenConfig = this.mobileConfig;
      } else {
        this.screenConfig = this.desktopConfig;
      }
    });
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
}
