import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ErrorCode} from '../../../consts/ErrorCode';
import {LoaderStatus} from '../../../consts/LoaderStatus';
import {AcceptComponent} from '../../../shared/accpet/accept.component';
import {AcceptService} from '../../../services/accept-service';

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

  loadMessage = '';
  loadStatus = LoaderStatus.NONE;

  constructor(
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
    this.loadStatus = LoaderStatus.LOAD;
    this.loadMessage = 'Обработка...';
    this.event.emit(null);
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
