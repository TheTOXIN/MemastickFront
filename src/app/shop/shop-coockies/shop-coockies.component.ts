import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopApiService} from '../../api/shop-api-service';
import {PriceConst} from '../../consts/PriceConst';
import {Error} from 'tslint/lib/error';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';

@Component({
  selector: 'app-shop-coockies',
  templateUrl: './shop-coockies.component.html',
  styleUrls: ['./shop-coockies.component.scss']
})
export class ShopCoockiesComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public counter = 1;
  public price = PriceConst.COOKIE;

  constructor(
    private shopApi: ShopApiService
  ) {

  }

  ngOnInit() {
  }

  buy() {
    this.shopApi.cookies(this.counter).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }

  plusCount() {
    this.counter++;
    this.initPrice();
  }

  minusCount() {
    if (this.counter !== 0) {
      this.counter--;
      this.initPrice();
    }
  }

  initPrice() {
    this.price = PriceConst.COOKIE * this.counter;
  }
}
