import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CardState} from '../../state/card-state.service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

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
      transition('* => open', animate(228, keyframes(slideInUp))),
      transition('* => close', animate(228, keyframes(slideOutDown)))
    ])
  ]
})
export class CardComponent implements OnInit {

  @ViewChild('content', {read: ViewContainerRef}) ctr: ViewContainerRef;

  animState = '';

  constructor(
    private cardState: CardState,
    private resolve: ComponentFactoryResolver
  ) {
    this.animState = 'open';
  }

  ngOnInit() {
    const content = this.cardState.options.content;

    const factory = this.resolve.resolveComponentFactory(content);
    const ref: any = this.ctr.createComponent(factory);

    ref.instance.options = this.cardState.options;

    if (ref.instance.closer != null) {
      ref.instance.closer.subscribe(() => {
        this.close();
      });
    }
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
