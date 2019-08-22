import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';

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

  constructor() { }

  ngOnInit() {
  }

  viewMemotype() {
    this.view.viewShow(this.memotype);
  }
}
