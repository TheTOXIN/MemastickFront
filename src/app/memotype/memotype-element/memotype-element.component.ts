import {Component, Input, OnInit} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
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
