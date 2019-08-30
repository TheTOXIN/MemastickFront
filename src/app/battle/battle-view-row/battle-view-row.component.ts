import {Component, Input, OnInit} from '@angular/core';
import {BattleView} from '../../model/battle/BattleView';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {BattleStatus} from '../../consts/BattleStatus';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BattleViewModalComponent} from '../battle-view-modal/battle-view-modal.component';
import {SvgIconRegistryService} from 'angular-svg-icon';
import {FRONT_URL} from '../../app.constants';

@Component({
  selector: 'app-battle-view-row',
  templateUrl: './battle-view-row.component.html',
  styleUrls: ['./battle-view-row.component.scss']
})
export class BattleViewRowComponent implements OnInit {

  @Input()
  public battle: BattleView;

  public forwardAvatar: string;
  public defenderAvatar: string;

  swordIcon = FRONT_URL + '/assets/images/svg/sword.svg';
  scullIcon = FRONT_URL + '/assets/images/svg/skull.svg';

  swordStyle: any;
  scullStyle: any;

  statuses = BattleStatus;

  constructor(
    private avatarApi: MemetickAvatarApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.forwardAvatar = this.avatarApi.dowloadAvatar(this.battle.forward.memetickId);
    this.defenderAvatar = this.avatarApi.dowloadAvatar(this.battle.defender.memetickId);

    this.swordStyle = { 'width.px': '20', 'height.px': '20' , 'fill': this.battle.my ? '#dc3545' : '#495057'};
    this.scullStyle = { 'width.px': '20', 'height.px': '20' , 'fill': !this.battle.my ? '#000' : '#495057'};
  }

  battleView() {
    const modalRef = this.modalService.open(BattleViewModalComponent, {'centered': true});
    modalRef.componentInstance.battle = this.battle;
  }
}
