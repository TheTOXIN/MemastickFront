import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ErrorCode} from '../../../consts/ErrorCode';
import {LoaderStatus} from '../../../consts/LoaderStatus';
import {AcceptComponent} from '../../../shared/accpet/accept.component';

@Component({
  selector: 'app-shop-button',
  templateUrl: './shop-button.component.html',
  styleUrls: ['./shop-button.component.scss']
})
export class ShopButtonComponent implements OnInit {

  @ViewChild(AcceptComponent) coinAccept: AcceptComponent;

  @Input()
  public text: string;

  @Input()
  public price: number;

  @Input()
  public disable: any;

  @Output()
  public event = new EventEmitter<any>();

  loadMessage = '';
  loadStatus = LoaderStatus.NONE;

  constructor(
  ) {

  }

  ngOnInit() {
    if (this.text == null) {
      this.text = 'КУПИТЬ';
    }
  }

  buyAccept() {
    if (this.price <= 0) { return; }
    this.coinAccept.show('-' + this.price);
  }

  buyStart(accept: boolean) {
    if (accept) {
      this.loadStatus = LoaderStatus.LOAD;
      this.loadMessage = 'Обработка...';
      this.event.emit(null);
    }
  }

  buyDone() {
    this.loadStatus = LoaderStatus.DONE;
    this.loadMessage = 'Покупка совершена';
  }

  buyError(data: any) {
    if (data.error.code === ErrorCode.MEME_COIN_ENOUGH) {
      this.loadMessage = 'Не хватает мемкойнов';
    } else if (data.error.code === ErrorCode.TOO_MUCH) {
      this.loadMessage = 'Слишком много';
    } else {
      this.loadMessage = 'Ошибка покупки';
    }

    this.loadStatus = LoaderStatus.ERROR;
  }
}
