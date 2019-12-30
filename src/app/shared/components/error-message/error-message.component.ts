import { Component, Input, Output } from '@angular/core';
import { ErrorMessage } from '../../models/error-message';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() errorMessage: ErrorMessage;
  @Output() back = new EventEmitter();
}
