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

  public loader: LoaderState = new LoaderState();

  constructor(
    public activeModal: NgbActiveModal,
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
    this.loader.event = () => this.close();
  }

  response(accept: boolean) {
    this.loader.status = LoaderStatus.LOAD;
    this.loader.message = 'Отправляем...';

    const api = new BattleResponse(
      this.battleId,
      accept,
      this.pvpCurrent
    );

    this.battleApi.response(api).subscribe(
      () => {
        this.loader.status = LoaderStatus.DONE;
        this.loader.message = 'ГОТОВО';
      }, () => {
        this.loader.status = LoaderStatus.ERROR;
        this.loader.message = 'ОШИБКА';
      }
    );
  }

  close() {
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/battle/view/' + this.battleId);
  }
}
