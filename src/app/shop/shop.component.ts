import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopApiService} from '../api/shop-api-service';
import {AcceptComponent} from '../shared/accpet/accept.component';
import {LoaderStatus} from '../consts/LoaderStatus';
import {ErrorCode} from '../consts/ErrorCode';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild(AcceptComponent) coinAccept: AcceptComponent;

  public counter = 0;
  public testPrice = 50;

  loadMessage = '';
  loadStatus = LoaderStatus.NONE;

  constructor(
    private shopApi: ShopApiService
  ) {

  }

  ngOnInit() {
  }

  test() {
    if (this.counter <= 0) { return; }
    this.coinAccept.show('-' + this.testPrice * this.counter);
  }

  acceptCoinResult(accept: boolean) {
    if (accept) {
      this.loadStatus = LoaderStatus.LOAD;
      this.loadMessage = 'Обработка...';

      this.shopApi.test(this.counter).subscribe(
        () => this.buyDone(),
        (data) => this.buyError(data)
      );

      this.counter = 0;
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

  plusCount() {
    this.counter++;
  }

  minusCount() {
    if (this.counter !== 0) {
      this.counter--;
    }
  }

  back() {
    window.history.back();
  }
}
