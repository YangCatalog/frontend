import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'advancedFormat'
})
export class AdvancedFormatPipe implements PipeTransform {

  transform(value, ...args: unknown[]): unknown {
    let val: string = value;
    if (value) {
      val = val.replace(/\</g, ' &lt;');
      val = val.replace(/\>/g, ' &gt;');
      return this.linkify(val.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    }
  }

  linkify(inputText: string) {
    // URLs starting with http://, https://, or ftp://
    const protocolPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    let replacedText = inputText.replace(protocolPattern, '<a href="$1" target="_blank">$1</a>');

    // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    const wwwPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(wwwPattern, '$1<a href="http://$2" target="_blank">$2</a>');

    // Change email addresses to mailto:: links.
    let emailPattern = /mailto:(([a-zA-Z0-9\-\_\.]+)@([a-zA-Z\_\-]+)\.([a-zA-Z]{2,6}))/gim;
    if (replacedText.indexOf('mailto:') === -1) {
      emailPattern = /(([a-zA-Z0-9\-\_\.]+)@([a-zA-Z\_\-]+)\.([a-zA-Z]{2,6}))/gim;
    }
    replacedText = replacedText.replace(emailPattern, '<a href="mailto:$1">$1</a>');
    return replacedText;
  }

}
