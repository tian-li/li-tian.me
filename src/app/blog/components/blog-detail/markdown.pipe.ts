import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(content: string): SafeHtml {
    return this.sanitized.bypassSecurityTrustHtml(marked(content, { sanitize: true }));
  }
}
