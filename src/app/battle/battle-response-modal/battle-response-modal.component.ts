import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {BattleConst} from '../../consts/BattleConst';
import {BattleApiService} from '../../api/battle-api-service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {BattleResponse} from '../../model/battle/BattleResponse';
import {FRONT_URL} from '../../app.constants';
import {Router} from '@angular/router';
import {LoaderState} from '../../state/loader-state';
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
    this.loaderService.setLoad('Отправляем...');

    const api = new BattleResponse(
      this.battleId,
      accept,
      this.pvpCurrent
    );

    this.battleApi.response(api).subscribe(
      () => this.loaderService.setDoneEvent('ГОТОВО', () => this.close()),
      () => this.loaderService.setErrorEvent('ОШИБКА', () => this.close())
    );
  }

  close() {
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/battle/view/' + this.battleId);
  }
}
