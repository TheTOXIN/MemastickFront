import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LoaderStatus} from '../../../consts/LoaderStatus';
import {AcceptComponent} from '../../../shared/accpet/accept.component';
import {ErrorCode} from '../../../consts/ErrorCode';

@Component({
  selector: 'app-shop-price',
  templateUrl: './shop-price.component.html',
  styleUrls: ['./shop-price.component.scss']
})
export class ShopPriceComponent implements OnInit {

  @Input()
  public price: number;

  constructor(

  ) {

  }

  ngOnInit() {
  }
}
