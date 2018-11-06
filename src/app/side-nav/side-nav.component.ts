import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Output() routeChanged: EventEmitter<void> = new EventEmitter<void>();

  clicked(): void {
    this.routeChanged.emit();
  }
}
