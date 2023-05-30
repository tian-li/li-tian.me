import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(content: string): SafeHtml {
    marked.use(markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    }));
    return this.sanitized.bypassSecurityTrustHtml(marked.parse(content));
  }
}
