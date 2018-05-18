import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'rankPipe' })
export class RankPipe implements PipeTransform {
	transform(_items: any, _rankFilter:string) : any {
		if(_rankFilter){
			return _items.filter(
      			item => item.rank === _rankFilter);
		}else{
			return _items;
		}
	}
}




@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
