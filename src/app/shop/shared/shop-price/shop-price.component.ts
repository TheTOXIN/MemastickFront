import {Component, Input, OnInit} from '@angular/core';

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
