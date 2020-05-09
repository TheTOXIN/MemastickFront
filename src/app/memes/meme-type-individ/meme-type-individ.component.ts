import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Meme} from '../../model/Meme';
import {BattleApiService} from '../../api/battle-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {ErrorCode} from '../../consts/ErrorCode';
import {BattleRequest} from '../../model/battle/BattleRequest';
import {MemeFilter} from '../../consts/MemeFilter';
import {MemesModalComponent} from '../memes-modal/memes-modal.component';
import {MemeLoh} from '../../model/meme/MemeLoh';
import {MemeLohApiService} from '../../api/meme-loh-api-service';
import {BattleConst} from '../../consts/BattleConst';
import {AcceptService} from '../../services/accept-service';
import {LoaderState} from '../../state/loader-state';
import {LoaderService} from '../../services/loader-service';

@Component({
  selector: 'app-meme-type-individ',
  templateUrl: './meme-type-individ.component.html',
  styleUrls: ['./meme-type-individ.component.scss']
})
export class MemeTypeIndividComponent implements OnInit {

  @Input()
  public meme: Meme;

  isBattle = false;

  constructor(
    public loaderService: LoaderService,
    private acceptService: AcceptService,
    private battleApi: BattleApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {

  }

  battle() {
    const modalRef = this.modalService.open(MemesModalComponent, {'centered': true});

    modalRef.componentInstance.title = 'ВЫБЕРЕТЕ СВОЙ МЕМ';
    modalRef.componentInstance.filter = MemeFilter.BATL;

    modalRef.componentInstance.event.subscribe((meme) => {
      this.acceptService.accept({
        img: 'assets/images/icon/battle.png',
        text: 'Бросить вызов?'
      }).then(
        () => this.battleAccept(meme),
        () => {}
      );
    });
  }

  battleAccept(myMeme: any) {
    this.loaderService.setLoad('Вызываем меметика на битву');
    this.isBattle = true;

    const request = new BattleRequest(
      myMeme.id,
      this.meme.id
    );

    this.battleApi.request(request).subscribe(
      () => this.battleDone(),
      (data) => this.battleError(data.error),
      () => this.isBattle = false
    );
  }

  public battleDone() {
    this.loaderService.setDone('Вызов отправлен, ждите ответа');
  }

  public battleError(error: any) {
    let message;

    if (error.code === ErrorCode.BATTLE_REQUEST_ME) {
      message = 'Вы не можите бросить вызов своему мему';
    } else if (error.code === ErrorCode.BATTLE_COOKIE) {
      message = 'У вас должно быть ' + BattleConst.MAX_PVP + ' печенек';
    } else {
      message = 'Ошибка вызова на битву';
    }

    this.loaderService.setError(message);
  }
}
