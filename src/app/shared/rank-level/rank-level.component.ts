import {Component, Input, OnInit} from '@angular/core';
import {ColorUtils} from '../../utils/color-utils';

@Component({
  selector: 'app-rank-level',
  templateUrl: './rank-level.component.html',
  styleUrls: ['./rank-level.component.scss']
})
export class RankLevelComponent implements OnInit {

  @Input()
  public lvl: number;

  public color: string;

  constructor() {
  }

  ngOnInit() {
    this.color = ColorUtils.getRarityColor(this.lvl);
  }
}
