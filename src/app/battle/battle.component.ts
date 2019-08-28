import { Component, OnInit } from '@angular/core';
import {BattleApiService} from '../api/battle-api-service';
import {BattleStatus} from '../consts/BattleStatus';
import {BattleView} from '../model/battle/BattleView';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  public battleWait: BattleView[] = [];
  public battleStart: BattleView[] = [];
  public battleCancel: BattleView[] = [];
  public battleEnd: BattleView[] = [];

  isLoad = true;

  isBattleStart = true;
  isBattleEnd = true;

  constructor(
    private battleApi: BattleApiService
  ) {

  }

  ngOnInit() {
    this.battleApi.home().subscribe(data => {
      this.battleWait = data[BattleStatus.WAIT];
      this.battleStart = data[BattleStatus.START];
      this.battleCancel = data[BattleStatus.CANCEL];
      this.battleEnd = data[BattleStatus.END];

      this.isLoad = false;
    });
  }
}
