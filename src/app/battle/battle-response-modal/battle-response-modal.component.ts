import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {BattleConst} from '../../consts/BattleConst';
import {BattleApiService} from '../../api/battle-api-service';
import {BattleResponse} from '../../model/battle/BattleResponse';
import {Router} from '@angular/router';
import {LoaderService} from '../../services/loader-service';

@Component({
  selector: 'app-battle-response-modal',
  templateUrl: './battle-response-modal.component.html',
  styleUrls: ['./battle-response-modal.component.scss'],
  providers: [NgbDropdownConfig]
})
export class BattleResponseModalComponent implements OnInit {

  @Input()
  public battleId: UUID;

  public pvpCoin = BattleConst.MEMCOIN_PRESENT;
  public pvpList: number[] = [];
  public pvpCurrent: number = 5;

  constructor(
    public activeModal: NgbActiveModal,
    private loaderService: LoaderService,
    private battleApi: BattleApiService,
    private router: Router,
    config: NgbDropdownConfig
  ) {
    config.placement = 'bottom-center';
    for (let i = 0; i < BattleConst.MAX_PVP; i++) {
      this.pvpList[i] = i + 1;
    }
  }

  ngOnInit() {

  }

  response(accept: boolean) {
    this.activeModal.dismiss('Cross click');

    const api = new BattleResponse(
      this.battleId,
      accept,
      this.pvpCurrent
    );

    this.battleApi.response(api).subscribe(
      () => this.loaderService.setDoneEvent('ГОТОВО', () => this.toView()),
      () => this.loaderService.setErrorEvent('ОШИБКА', () => this.toView())
    );
  }

  toView() {
    this.router.navigateByUrl('/battle/view/' + this.battleId);
  }

  toClose() {
    this.loaderService.setLoad('Отправляем...');
  }
}
