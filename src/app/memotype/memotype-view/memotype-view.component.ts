import {Component, Input, OnInit} from '@angular/core';
import {Memotype} from '../../model/memotype/Memotype';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';

@Component({
  selector: 'app-memotype-view',
  templateUrl: './memotype-view.component.html',
  styleUrls: ['./memotype-view.component.scss']
})
export class MemotypeViewComponent implements OnInit {

  @Input()
  public memotype: Memotype;

  public memotypeColors;
  public memotypeNames;

  isPreview = false;

  constructor() {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
  }

  viewShow(memotype: Memotype) {
    this.memotype = memotype;
    this.isPreview = true;
  }

  viewClose() {
    this.memotype = null;
    this.isPreview = false;
  }
}
