import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {BattleConst} from '../../consts/BattleConst';
import {BattleApiService} from '../../api/battle-api-service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {BattleResponse} from '../../model/battle/BattleResponse';

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
  public pvpCurrent: number = 1;

  loadStatus: LoaderStatus;
  loadMessage: string;
  loadEvent: any;

  constructor(
    public activeModal: NgbActiveModal,
    private battleApi: BattleApiService,
    config: NgbDropdownConfig
  ) {
    config.placement = 'bottom-center';
    for (let i = 0; i < BattleConst.MAX_PVP; i++) {
      this.pvpList[i] = i + 1;
    }
  }

  ngOnInit() {
    this.loadMessage = '';
    this.loadStatus = LoaderStatus.NONE;
    this.loadEvent = () => this.close();
  }

  response(accept: boolean) {
    this.loadStatus = LoaderStatus.LOAD;
    this.loadMessage = 'Отправляем...';

    const api = new BattleResponse(
      this.battleId,
      accept,
      this.pvpCurrent
    );

    this.battleApi.response(api).subscribe(
      () => {
        this.loadStatus = LoaderStatus.DONE;
        this.loadMessage = 'ГОТОВО';
      }, () => {
        this.loadStatus = LoaderStatus.ERROR;
        this.loadMessage = 'ОШИБКА';
      }
    );
  }

  close() {
    this.activeModal.dismiss('Cross click');
  }
}
