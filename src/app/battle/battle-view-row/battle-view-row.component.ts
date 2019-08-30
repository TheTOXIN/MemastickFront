import {Component, Input, OnInit} from '@angular/core';
import {BattleView} from '../../model/battle/BattleView';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {BattleStatus} from '../../consts/BattleStatus';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BattleViewModalComponent} from '../battle-view-modal/battle-view-modal.component';
import {SvgIconRegistryService} from 'angular-svg-icon';
import {GlobalConst} from '../../consts/GlobalConst';
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

  statuses = BattleStatus;

  constructor(
    private avatarApi: MemetickAvatarApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private iconReg: SvgIconRegistryService
  ) {
    this.iconReg.loadSvg(FRONT_URL + '/assets/images/svg/skull.svg', 'skull');
  }

  ngOnInit() {
    this.forwardAvatar = this.avatarApi.dowloadAvatar(this.battle.forward.memetickId);
    this.defenderAvatar = this.avatarApi.dowloadAvatar(this.battle.defender.memetickId);
  }

  battleView() {
    const modalRef = this.modalService.open(BattleViewModalComponent, {'centered': true});
    modalRef.componentInstance.battle = this.battle;
  }
}
