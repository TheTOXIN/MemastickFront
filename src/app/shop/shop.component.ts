import {Component} from '@angular/core';
import {Router} from '@angular/router';

interface Product {
  txt: string;
  val: string;
  url: string;
  img: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  public products: Product[] = [{
    txt: 'Используй печеньки для голосования в битвах',
    val: 'ПЕЧЕНЬКИ',
    url: '/cookies',
    img: '/assets/images/icon/cookie.png',
  }, {
    txt: 'Собери их всех!',
    val: 'МЕМОТИПЫ*',
    url: '/memotypes',
    img: '/assets/images/icon/cell.png',
  }, {
    txt: 'Купи и получи пособие прямо сейчас!',
    val: 'ПОСОБИЕ',
    url: '/allowance',
    img: '/assets/images/icon/allowance.png',
  }, {
    txt: 'Получи новые возможности в системе',
    val: 'ГРАНТЫ*',
    url: '/grants',
    img: '/assets/images/icon/books.png',
  }, {
    txt: 'Повысь эффективность своего майнинга',
    val: 'КИРКИ*',
    url: '/pickaxe',
    img: '/assets/images/icon/pickaxe.png',
  }, {
    txt: 'Если твоей мем умер, ты можешь воскресить его, после чего он будет учавствовать в отборе',
    val: 'ВОСКРЕШЕНИЕ',
    url: '/resurrection',
    img: '/assets/images/icon/dead.png',
  }, {
    txt: 'Выбери себе любой ник прямо сейчас (от 3 до 16 символов)',
    val: 'НИКНЕЙМ',
    url: '/nick',
    img: '/assets/images/tokens/tmp.png',
  }, {
    txt: 'Опубликуй свой мем в наших соц.сетях',
    val: 'ПУБЛИКАЦИЯ',
    url: '/publish',
    img: '/assets/images/icon/community.png',
  }];

  public productText: string;
  public productTitle: string;
  public productImage: string;

  isMain: boolean;

  constructor(
    private router: Router
  ) {
    this.isMain = this.router.url === '/shop';
  }

  choose(product: Product) {
    this.productText = product.txt;
    this.productTitle = product.val;
    this.productImage = product.img;

    this.redirect(product.url);
  }

  redirect(url: string) {
    this.router.navigateByUrl('/shop' + url);
    this.isMain = false;
  }

  back() {
    this.router.navigateByUrl('/shop');
    this.isMain = true;
  }

  close() {
    this.router.navigateByUrl('/home');
  }
}
