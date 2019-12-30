import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { MarkdownPipe } from './pipes/markdown.pipe';

@NgModule({
  declarations: [ErrorMessageComponent, MarkdownPipe],
  imports: [ CommonModule ],
  exports: [ErrorMessageComponent, MarkdownPipe],
  providers: [],
})
export class SharedModule {}