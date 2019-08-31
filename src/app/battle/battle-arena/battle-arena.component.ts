import {Component, OnInit, ViewChild} from '@angular/core';
import {BattleApiService} from '../../api/battle-api-service';
import {UUID} from 'angular2-uuid';
import {BattlePreview} from '../../model/battle/BattlePreview';
import {BattleVote} from '../../model/battle/BattleVote';
import {Router} from '@angular/router';
import {BattleResult} from '../../model/battle/BattleResult';
import {ErrorCode} from '../../consts/ErrorCode';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';

@Component({
  selector: 'app-battle-arena',
  templateUrl: './battle-arena.component.html',
  styleUrls: ['./battle-arena.component.scss']
})
export class BattleArenaComponent implements OnInit {

  @ViewChild(MemeViewComponent) viewComponent: MemeViewComponent;

  public battleList: UUID[] = [];
  public battleCurrent: BattlePreview;

  isLoad = true;
  isMessage = false;
  isVote = false;
  isResult = false;

  public message: string;

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
        this.setMessage('ВЫ ПРОГОЛОСОВАЛИ ЗА ВСЕ БИТВЫ');
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

  giveVote(memberId: UUID) {
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
    this.nextVote();
  }

  private voteError(data: any) {
    if (data.error.code === ErrorCode.BATTLE_COOKIE) {
      this.setMessage('У ВАС ЗАКОНЧИЛИСЬ ПЕЧЕНЬКИ');
    } else {
      this.setMessage('ОШИБКА ГОЛОСОВАНИЯ');
    }
  }

  private voteComplete() {
    this.isVote = false;
    this.isResult = true;
  }

  nextVote() {
    this.battleList.shift();

    if (this.battleList.length === 0) {
      this.setMessage('БИТВЫ ДЛЯ ГОЛОСВАНИЯ ЗАКОНЧИЛИСЬ');
    } else {
      this.currentInit();
    }
  }

  setMessage(msg: string) {
    this.message = msg;
    this.isMessage = true;
  }

  viewMeme(url: string) {
    this.viewComponent.viewUrl(url);
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }
}
