import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();

  private predTop = 0;

  constructor(public el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    try {
      const top = event.target.scrollTop;
      const height = this.el.nativeElement.scrollHeight;
      const offset = this.el.nativeElement.offsetHeight;

      if (top > height - offset - 300) {
        this.scrollPosition.emit('more');
      }

      if (top > height - offset - 1) {
        this.scrollPosition.emit('bottom');
      }

      if (top === 0) {
        this.scrollPosition.emit('top');
      }

      if (top - this.predTop >= 10) {
        this.scrollPosition.emit('down');
      }

      if (top - this.predTop <= -10) {
        this.scrollPosition.emit('up');
      }

      this.predTop = top;

    } catch (err) {}
  }
}
