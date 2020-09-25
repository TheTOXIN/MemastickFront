import {Component, OnInit, ViewChild} from '@angular/core';
import {BattleApiService} from '../../api/battle-api-service';
import {UUID} from 'angular2-uuid';
import {BattlePreview} from '../../model/battle/BattlePreview';
import {Router} from '@angular/router';
import {BattleResult} from '../../model/battle/BattleResult';
import {ErrorCode} from '../../consts/ErrorCode';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BattleVote} from '../../model/battle/BattleVote';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.scss'],
  animations: [
    trigger('animCookie', [
      state('default', style({opacity: 1})),
      state('down', style({opacity: 0, transform: 'translateY(150%) scale(0.5)'})),
      state('up', style({opacity: 0, transform: 'translateY(-150%) scale(0.5)'})),
      transition('default => down', animate('500ms ease-in')),
      transition('default => up', animate('500ms ease-in'))
    ]),
  ]
})
export class BattleArenaComponent implements OnInit {

  @ViewChild(MemeViewComponent) viewComponent: MemeViewComponent;

  public battleList: UUID[] = [];
  public battleCurrent: BattlePreview;
  public battleResult: BattleResult;

  public message: string;

  forwardWin = false;
  defenderWin = false;

  cookieState = 'default';

  isLoad = true;
  isMessage = false;
  isVote = false;
  isResult = false;
  isCookie = false;

  constructor(
    public battleApi: BattleApiService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.isLoad = true;
    this.listInit();
  }

  listInit() {
    this.isLoad = true;
    this.battleApi.list().subscribe(data => {
      this.battleList = data;
      if (this.battleList.length === 0) {
        this.isLoad = false;
        this.setMessage('БИТВЫ ДЛЯ ГОЛОСОВАНИЯ ЗАКОНЧИЛИСЬ');
      } else {
        this.currentInit();
      }
    });
  }

  currentInit() {
    this.isLoad = true;
    const battleId = this.battleList[0];
    this.battleApi.preview(battleId).subscribe(data => {
      this.battleCurrent = data;
      this.isLoad = false;
    });
  }

  giveVote(memberId: UUID, stateAnim: any) {
    if (this.isVote) { return; }

    this.cookieState = stateAnim;
    this.isVote = true;

    const api = new BattleVote(
      this.battleCurrent.battleId,
      memberId
    );

    this.battleApi.vote(api).subscribe(
      data => this.voteDone(data),
      data => this.voteError(data),
      () => this.voteComplete()
    );
  }

  private voteDone(data: BattleResult) {
    this.isResult = true;
    this.battleResult = data;
  }

  private voteError(data: any) {
    if (data.error.code === ErrorCode.BATTLE_COOKIE) {
      this.setMessage('ЗАКОНЧИЛИСЬ ПЕЧЕНЬКИ, КУПИТЕ В МАГАЗИН');
      this.isCookie = true;
    } else {
      this.setMessage('ОШИБКА ГОЛОСОВАНИЯ');
    }
  }

  private voteComplete() {
    this.isVote = false;
    this.isResult = true;

    this.forwardWin = this.battleResult.forwardCount > this.battleResult.defenderCount;
    this.defenderWin = this.battleResult.defenderCount > this.battleResult.forwardCount;
  }

  nextVote() {
    this.battleList.shift();
    this.isResult = false;
    this.cookieState = 'default';

    if (this.battleList.length === 0) {
      this.listInit();
    } else {
      this.currentInit();
    }
  }

  setMessage(msg: string) {
    this.message = msg;
    this.isMessage = true;
  }

  viewMeme(url: string) {
    if (this.isResult) { return; }
    this.viewComponent.viewUrl(url);
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }

  toCookies() {
    this.router.navigateByUrl('/shop/cookies');
  }
}
