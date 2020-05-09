import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Meme} from '../../model/Meme';
import {ErrorCode} from '../../consts/ErrorCode';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {MemeApiService} from '../../api/meme-api-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {PriceConst} from '../../consts/PriceConst';
import {AcceptService} from '../../services/accept-service';
import {LoaderState} from '../../state/loader-state';

@Component({
  selector: 'app-meme-type-dead',
  templateUrl: './meme-type-dead.component.html',
  styleUrls: ['./meme-type-dead.component.scss']
})
export class MemeTypeDeadComponent implements OnInit {

  @Input()
  public meme: Meme;

  public resurrectPrice = PriceConst.RESSURECTION;

  public loader: LoaderState = new LoaderState();

  constructor(
    private acceptService: AcceptService,
    private memeApi: MemeApiService
  ) {

  }

  ngOnInit() {

  }

  resurrect() {
    this.acceptService.accept({
      img: 'assets/images/icon/memecoin.png',
      text: '-' + this.resurrectPrice
    }).then(
      () => this.resurrectAccept(),
      () => {}
    );
  }

  resurrectAccept() {
    this.loader.status = LoaderStatus.LOAD;
    this.loader.message = 'Воскрешаем';
    this.memeApi.memeResurrect(this.meme.id).subscribe(
      () => this.resurrectDone(),
      (data) => this.resurrectError(data)
    );
  }

  public resurrectDone() {
    this.loader.status = LoaderStatus.DONE;
    this.loader.message = 'Мем в отобре';
  }

  public resurrectError(data: any) {
    if (data.error.code === ErrorCode.MEME_COIN_ENOUGH) {
      this.loader.message = 'Не хватает мемкойнов';
    } else {
      this.loader.message = 'Ошибка воскрешения';
    }

    this.loader.status = LoaderStatus.ERROR;
  }
}
