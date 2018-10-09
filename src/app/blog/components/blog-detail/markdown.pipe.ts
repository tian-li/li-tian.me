import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(content: string): SafeHtml {
    marked.setOptions({
      highlight: (text: string) => {
        return hljs.highlightAuto(text).value;
      }
    });
    return this.sanitized.bypassSecurityTrustHtml(marked(content, { sanitize: true }));
  }
}
