import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';
import {Meme} from '../../model/Meme';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';

@Component({
  selector: 'app-memotype-element',
  templateUrl: './memotype-element.component.html',
  styleUrls: ['./memotype-element.component.scss']
})
export class MemotypeElementComponent implements OnInit {

  @Input()
  public memotype: Memotype;

  @Input()
  public showCount = true;

  @Input()
  public showTitle = true;

  @Input()
  public buyMode = false;

  public memotypeColors = [];
  public memotypeNames = [];

  constructor() {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
  }
}
