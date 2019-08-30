import {Component, Input, OnInit} from '@angular/core';
import {BattleView} from '../../model/battle/BattleView';
import {BattleStatus} from '../../consts/BattleStatus';

@Component({
  selector: 'app-battle-list',
  templateUrl: './battle-list.component.html',
  styleUrls: ['./battle-list.component.scss']
})
export class BattleListComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public select: boolean;

  @Input()
  public contentFirst: BattleView[] = [];

  @Input()
  public contentSecond: BattleView[] = [];

  public nameFirst = 'заявки';
  public nameSecond = 'битвы';

  public firstEmpty = true;
  public secondEmpty = true;

  constructor() {

  }

  ngOnInit() {
    this.firstEmpty = this.contentFirst == null || this.contentFirst.length === 0;
    this.secondEmpty = this.contentSecond == null || this.contentSecond.length === 0;
  }
}
