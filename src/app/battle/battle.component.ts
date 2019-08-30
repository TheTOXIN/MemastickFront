import { Component, OnInit } from '@angular/core';
import {BattleApiService} from '../api/battle-api-service';
import {BattleView} from '../model/battle/BattleView';
import {Router} from '@angular/router';
import {BattleStatus} from '../consts/BattleStatus';

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

  public battlesCount;
  public membersCount;

  isLoad = true;

  constructor(
    private battleApi: BattleApiService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.battleApi.home().subscribe(data => {
      this.battleWait = data.battles[BattleStatus.WAIT];
      this.battleStart = data.battles[BattleStatus.START];
      this.battleCancel = data.battles[BattleStatus.CANCEL];
      this.battleEnd = data.battles[BattleStatus.END];

      this.battlesCount = data.battlesCount;
      this.membersCount = data.membersCount;

      this.isLoad = false;
    });
  }

  toArena() {
    this.router.navigateByUrl('/battle/arena');
  }

  toRating() {
    this.router.navigateByUrl('/battle/rating');
  }
}
