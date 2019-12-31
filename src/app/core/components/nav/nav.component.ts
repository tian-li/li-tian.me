import { Component, Output, EventEmitter } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent {
  opened = true;

  // constructor(breakpointObserver: BreakpointObserver) {
  //   breakpointObserver
  //     .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
  //     .subscribe((result: BreakpointState) => {
  //       console.log("match result", result);

  //       if(result.matches) {
  //         this.close();
  //       }
  //     });
  // }

  close() {
    this.opened = false;
  }

  open() {
    this.opened = true;
  }


}
