import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome(): void {
    this.router.navigate(['blog/page/1']);
  }
}
