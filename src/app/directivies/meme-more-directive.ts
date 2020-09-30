import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appMemeMore]'
})
export class MemeMoreDirective {

  @Output() moreEvent = new EventEmitter();

  constructor(public el: ElementRef) {

  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const top = event.target.scrollTop;

    const height = this.el.nativeElement.scrollHeight;
    const offset = this.el.nativeElement.offsetHeight;

    if (top > height - offset - 300) {
      this.moreEvent.emit();
    }
  }
}
