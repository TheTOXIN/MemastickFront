import {Component, Input, OnInit} from '@angular/core';
import {BattleView} from '../../model/battle/BattleView';

@Component({
  selector: 'app-battle-list',
  templateUrl: './battle-list.component.html',
  styleUrls: ['./battle-list.component.scss']
})
export class BattleListComponent implements OnInit {

  @Input()
  public title: string;

  @Input()
  public contentFirst: BattleView[] = [];

  @Input()
  public contentSecond: BattleView[] = [];

  public nameFirst = 'текущие';
  public nameSecond = 'завершенные';

  public firstEmpty = true;
  public secondEmpty = true;

  public select: boolean = true;

  constructor() {

  }

  ngOnInit() {
    this.firstEmpty = this.contentFirst == null || this.contentFirst.length === 0;
    this.secondEmpty = this.contentSecond == null || this.contentSecond.length === 0;
  }
}
