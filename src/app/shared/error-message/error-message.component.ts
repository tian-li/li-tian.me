import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errorMessage: HttpErrorResponse;

  constructor(private router: Router) { }

  backToHome(): void {
    this.router.navigate(['blog/page/1']);
  }
}
