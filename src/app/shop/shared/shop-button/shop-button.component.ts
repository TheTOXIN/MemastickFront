import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ErrorCode} from '../../../consts/ErrorCode';
import {LoaderStatus} from '../../../consts/LoaderStatus';
import {AcceptComponent} from '../../../shared/accpet/accept.component';
import {AcceptService} from '../../../services/accept-service';
import {LoaderState} from '../../../state/loader-state';
import {LoaderService} from '../../../services/loader-service';

@Component({
  selector: 'app-shop-button',
  templateUrl: './shop-button.component.html',
  styleUrls: ['./shop-button.component.scss']
})
export class ShopButtonComponent implements OnInit {

  @Input()
  public text: string;

  @Input()
  public price: number;

  @Input()
  public disable: any;

  @Output()
  public event = new EventEmitter<any>();

  constructor(
    private loaderService: LoaderService,
    private acceptService: AcceptService,
  ) {

  }

  ngOnInit() {
    if (this.text == null) {
      this.text = 'КУПИТЬ';
    }
  }

  buyAccept() {
    if (this.price <= 0) { return; }

    this.acceptService.accept({
      img: 'assets/images/icon/memecoin.png',
      text: '-' + this.price
    }).then(
      () => this.buyStart(),
      () => {}
    );
  }

  buyStart() {
    this.loaderService.setLoad('Обработка...');
    this.event.emit(null);
  }

  buyDone() {
    this.loaderService.setDone('Покупка совершена');
  }

  buyError(data: any) {
    let message;

    if (data.error.code === ErrorCode.MEME_COIN_ENOUGH) {
      message = 'Не хватает мемкойнов';
    } else if (data.error.code === ErrorCode.TOO_MUCH) {
      message = 'Слишком много';
    } else {
      message = 'Ошибка покупки';
    }

    this.loaderService.setError(message);
  }
}
