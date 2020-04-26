import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Meme} from '../../model/Meme';
import {BattleApiService} from '../../api/battle-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {PriceConst} from '../../consts/PriceConst';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {ErrorCode} from '../../consts/ErrorCode';
import {BattleRequest} from '../../model/battle/BattleRequest';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemesModalComponent} from '../memes-modal/memes-modal.component';
import {MemeLoh} from '../../model/meme/MemeLoh';
import {MemeLohApiService} from '../../api/meme-loh-api-service';

@Component({
  selector: 'app-meme-type-individ',
  templateUrl: './meme-type-individ.component.html',
  styleUrls: ['./meme-type-individ.component.scss']
})
export class MemeTypeIndividComponent implements OnInit {

  @ViewChild(AcceptComponent) resurrectAccept: AcceptComponent;

  @Input()
  public meme: Meme;

  public my: Meme;

  public loh: MemeLoh;
  public lohLoad = false;

  loadMessage = '';
  loadStatus = LoaderStatus.NONE;

  constructor(
    private battleApi: BattleApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private memeLohApi: MemeLohApiService
  ) {

  }

  ngOnInit() {
    this.memeLohApi.read(this.meme.id).subscribe(data => {
      this.loh = data;
      this.lohLoad = true;
    });
  }

  battle() {
    const modalRef = this.modalService.open(MemesModalComponent);
    modalRef.componentInstance.title = 'ВЫБЕРЕТЕ СВОЙ МЕМ';
    modalRef.componentInstance.filter = MemeFilter.MYID;
    modalRef.componentInstance.event.subscribe((meme) => {
      this.my = meme;
      this.resurrectAccept.show('Бросить вызов?');
    });
  }

  battleAcceptResult(accept: boolean) {
    if (accept) {
      if (this.loadStatus === LoaderStatus.LOAD) {
        return;
      }

      this.loadStatus = LoaderStatus.LOAD;
      this.loadMessage = 'Вызываем меметика на битву';

      const request = new BattleRequest(
        this.my.id,
        this.meme.id
      );

      this.battleApi.request(request).subscribe(
        () => this.battleDone(),
        (data) => this.battleError(data.error)
      );
    }
  }

  public battleDone() {
    this.loadMessage = 'Вызов отправлен, ждите ответа';
    this.loadStatus = LoaderStatus.DONE;
  }

  public battleError(error: any) {
    if (error.code === ErrorCode.BATTLE_REQUEST_ME) {
      this.loadMessage = 'Вы не можите бросить вызов своему мему';
    } else {
      this.loadMessage = 'Ошибка вызова на битву';
    }
    this.loadStatus = LoaderStatus.ERROR;
  }
}
