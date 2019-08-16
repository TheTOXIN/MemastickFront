import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ShopApiService} from '../../../api/shop-api-service';
import {ErrorCode} from '../../../consts/ErrorCode';
import {LoaderStatus} from '../../../consts/LoaderStatus';
import {AcceptComponent} from '../../../shared/accpet/accept.component';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-shop-button',
  templateUrl: './shop-button.component.html',
  styleUrls: ['./shop-button.component.scss']
})
export class ShopButtonComponent implements OnInit {

  @ViewChild(AcceptComponent) coinAccept: AcceptComponent;

  @Input()
  public price: number;

  @Output()
  public event = new EventEmitter<null>();

  loadMessage = '';
  loadStatus = LoaderStatus.NONE;

  constructor(
  ) {

  }

  ngOnInit() {

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
    } else {
      this.loadMessage = 'Ошибка транзакции';
    }
    this.loadStatus = LoaderStatus.ERROR;
  }
}
