import {Component, OnInit} from '@angular/core';
import {BattleApiService} from '../api/battle-api-service';
import {BattleView} from '../model/battle/BattleView';
import {Router} from '@angular/router';
import {BattleStatus} from '../consts/BattleStatus';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BattleRuleModalComponent} from './battle-rule-modal/battle-rule-modal.component';
import {StorageService} from '../services/storage-service';
import {OauthApiService} from '../services/oauth-api-service';

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

  public battleHint: string;

  isLoad = true;
  isOauth = false;

  hints = [
    'Выбирайте PVP граммотно, от него может зависть ваша победа',
    'Когда отвечайте на вызов, держите в голове, что ваш мем может умереть',
    'Старайтесь на арене угадывать мемы, с наибольшим кол-вом голосов',
    'Если вы проголосовали за мем который проигрывает, ваше ДНК комбо обнуляется',
    'Не забывайте, что ваше место в рейтинге, может занять другой меметик',
  ];

  constructor(
    private battleApi: BattleApiService,
    private router: Router,
    private modalService: NgbModal,
    private storage: StorageService,
    private oauth: OauthApiService
  ) {
    this.battleHint = this.hints[Math.floor(Math.random() * this.hints.length)];
  }

  ngOnInit() {
    this.checkOuath();

    if (!this.isOauth) { return; }
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

  private checkOuath() {
    this.isOauth = this.oauth.checkTokens();
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

  toStart() {
    this.router.navigateByUrl('/start');
  }

  toInfo() {
    this.modalService.open(BattleRuleModalComponent, {'centered': true});
  }
}
