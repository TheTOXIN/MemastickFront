import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BattleView} from '../../model/battle/BattleView';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {BattleStatus} from '../../consts/BattleStatus';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';
import {BattleResponseModalComponent} from '../battle-response-modal/battle-response-modal.component';
import {MemeApiService} from '../../api/meme-api-service';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';

@Component({
  selector: 'app-battle-view-modal',
  templateUrl: './battle-view-modal.component.html',
  styleUrls: ['./battle-view-modal.component.scss']
})
export class BattleViewModalComponent implements OnInit {

  @ViewChild(MemeViewComponent) viewComponent: MemeViewComponent;

  @Input()
  public battle: BattleView;
  public pvpCurrent: number;

  public forwardAvatars: string;
  public defenderAvatars: string;

  public forwardMeme: string;
  public defenderMeme: string;

  public isResponse = false;
  public isCounter = false;

  public title = '...';
  public titles = [];

  constructor(
    public activeModal: NgbActiveModal,
    private avatarApi: MemetickAvatarApiService,
    private memeApi: MemeApiService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.titles[BattleStatus.WAIT] = 'ОЖИДАНИЕ ЗАЯВКИ';
    this.titles[BattleStatus.START] = 'БИТВА НАЧАЛАСЬ';
    this.titles[BattleStatus.CANCEL] = 'ЗАВЕРШЕНИЕ ЗАЯВКИ';
    this.titles[BattleStatus.END] = 'БИТВА ЗАВЕРШЕНА';
  }

  ngOnInit() {
    this.memeApi.memeIMG(this.battle.forward.memeId).subscribe(data => this.forwardMeme = data.url);
    this.memeApi.memeIMG(this.battle.defender.memeId).subscribe(data => this.defenderMeme = data.url);

    this.forwardAvatars = this.avatarApi.dowloadAvatar(this.battle.forward.memetickId);
    this.defenderAvatars = this.avatarApi.dowloadAvatar(this.battle.defender.memetickId);

    this.title = this.titles[this.battle.status];
    this.isCounter = this.battle.status === BattleStatus.START || this.battle.status === BattleStatus.END;

    this.pvpCurrent = Math.abs(this.battle.forward.votes - this.battle.defender.votes);
    this.isResponse = this.battle.status === BattleStatus.WAIT && !this.battle.my;
  }

  viewMeme(url: string) {
    this.viewComponent.viewUrl(url);
  }

  toMemetick(memetickId: UUID) {
    this.router.navigate(['/memetick', memetickId]);
    this.close();
  }

  response() {
    const ngbModalRef = this.modalService.open(BattleResponseModalComponent, {'centered': true});
    ngbModalRef.componentInstance.battleId = this.battle.battleId;
    this.close();
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
