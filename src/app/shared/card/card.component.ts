import {Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CardState} from '../../state/card-state.service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import * as Hammer from 'hammerjs';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';

const slideInUp  = [
  style({visibility: 'visible', transform: 'translate3d(0, 100%, 0)'}),
  style({transform: 'translate3d(0, 0, 0)'})
];

const slideOutDown  = [
  style({transform: 'translate3d(0, 0, 0)'}),
  style({visibility: 'hidden', transform: 'translate3d(0, 100%, 0)'})
];

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition('* => open', animate(150, keyframes(slideInUp))),
      transition('* => close', animate(150, keyframes(slideOutDown)))
    ])
  ]
})
export class CardComponent implements OnInit {

  @ViewChild('content', { read: ViewContainerRef }) ctr: ViewContainerRef;
  @ViewChild('drag') drag: ElementRef;

  animState;
  cardHeight;

  readonly windowHeight;
  readonly cardPosClose;

  constructor(
    private cardState: CardState,
    private resolve: ComponentFactoryResolver
  ) {
    this.animState = 'open';
    this.windowHeight = window.innerHeight;
    this.cardPosClose = this.windowHeight / 2;
    this.cardHeight = this.windowHeight / 100 * 85;
  }

  ngOnInit() {
    const content = this.cardState.options.content;

    const factory = this.resolve.resolveComponentFactory(content);
    const ref: any = this.ctr.createComponent(factory);

    ref.instance.options = this.cardState.options;

    this.dragInit();
  }

  dragInit() {
    const mc = new Hammer(this.drag.nativeElement);

    mc.get('pan').set({
      direction: Hammer.DIRECTION_ALL
    });

    mc.on('panup pandown', (event) => {
      const y = event.center.y;
      if (y >= 0) {
        this.cardHeight = this.windowHeight - event.center.y;
      }
    });

    mc.on('panend', () => {
      if (this.cardHeight < this.cardPosClose) {
        this.startClose();
      }
    });
  }

  startClose() {
    this.animState = 'close';
  }

  endClose() {
    if (this.animState === 'close') {
      this.close();
    }
  }

  close() {
    this.cardState.modal.close();
  }
}
