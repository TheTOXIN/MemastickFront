import { Component, OnInit } from '@angular/core';
import {BattleApiService} from '../api/battle-api-service';
import {BattleView} from '../model/battle/BattleView';
import {Router} from '@angular/router';
import {BattleStatus} from '../consts/BattleStatus';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FollowingModalComponent} from '../modals/following-modal/following-modal.component';
import {BattleRuleModalComponent} from './battle-rule-modal/battle-rule-modal.component';
import {StorageService} from '../services/storage-service';

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
    private router: Router,
    private modalService: NgbModal,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    if (this.storage.battleRule()) { this.toInfo(); }

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

  toMemes() {
    this.router.navigateByUrl('/memes?filter=INDV');
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  toInfo() {
    this.modalService.open(BattleRuleModalComponent, {'centered': true});
  }
}
