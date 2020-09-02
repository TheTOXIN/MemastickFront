import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CardState} from '../../state/card-state.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('content', {read: ViewContainerRef}) ctr: ViewContainerRef;

  constructor(
    private state: CardState,
    private resolve: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {
    const content = this.state.options.content;

    const factory = this.resolve.resolveComponentFactory(content);
    const ref: any = this.ctr.createComponent(factory);

    ref.instance.options = this.state.options;

    if (ref.instance.closer != null) {
      ref.instance.closer.subscribe(() => {
        this.close();
      });
    }
  }

  close() {
    this.state.modal.close();
  }
}
