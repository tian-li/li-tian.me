import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(content: string): SafeHtml {
    marked.setOptions({
      highlight: (content) => {
        return hljs.highlightAuto(content).value;
      }
    });
    let hlighted = marked(content, { sanitize: true });
    console.log('hlighted', hlighted)
    // return hlighted;
    return this.sanitized.bypassSecurityTrustHtml(hlighted);
  }
}
