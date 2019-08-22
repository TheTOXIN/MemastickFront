import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-memotype-element',
  templateUrl: './memotype-element.component.html',
  styleUrls: ['./memotype-element.component.scss']
})
export class MemotypeElementComponent implements OnInit {

  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  @Input()
  public memotype: Memotype;

  @Input()
  public showCount = true;

  @Input()
  public showTitle = true;

  @Input()
  public buyMode = false;

  @Output()
  public clickEvent = new EventEmitter<Memotype>();

  constructor() { }

  ngOnInit() {
  }

  viewMemotype() {
    this.clickEvent.emit(this.memotype);
    if (this.memotype.count === 0) { return; }
    this.view.viewShow(this.memotype);
  }
}
