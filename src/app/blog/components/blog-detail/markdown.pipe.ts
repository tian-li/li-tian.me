import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as marked from 'marked';

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {}
  transform(content: string): string {
    console.log('markdown pipe', content);
    // let v = this.sanitized.bypassSecurityTrustHtml(content)
    // console.log('v', v);
    let res = marked(content, { sanitize: true });
    console.log('res', res);
    return res;
  }
}
