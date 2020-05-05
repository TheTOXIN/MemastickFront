import {Component, OnInit} from '@angular/core';
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
export class ShopComponent implements OnInit {

  public products: Product[] = [{
    txt: 'Используй печеньки для голосования в битвах',
    val: 'ПЕЧЕНЬКИ',
    url: '/cookies',
    img: '/assets/images/icon/cookie.png',
  }, {
    txt: 'Собери их всех!',
    val: 'МЕМОТИПЫ',
    url: '/memotypes',
    img: '/assets/images/icon/memotype.png',
  }, {
    txt: 'Покупка токенов будет удалена после релиза ⛔️',
    val: 'ТОКЕНЫ',
    url: '/tokens',
    img: '/assets/images/tokens/all.png',
  }, {
    txt: 'Получи новые возможности в системе',
    val: 'ГРАНТЫ*',
    url: '/grants',
    img: '/assets/images/icon/grants.png',
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
    img: '/assets/images/icon/nick_edit.png',
  }, {
    txt: 'Опубликуй свой мем в наших соц.сетях',
    val: 'ПУБЛИКАЦИЯ',
    url: '/publish',
    img: '/assets/images/icon/community.png',
  }];

  public currentProduct: Product;

  isMain: boolean;
  fromMain: boolean;

  constructor(
    private router: Router
  ) {
    this.isMain = this.router.url === '/shop';
    this.fromMain = this.isMain;
  }

  ngOnInit() {
    if (!this.fromMain) {
      const url = this.router.url;
      for (const prod of this.products) {
        if (url.includes(prod.url)) {
          this.currentProduct = prod;
          break;
        }
      }
    }
  }

  choose(product: Product) {
    this.currentProduct = product;
    this.redirect(product.url);
  }

  redirect(url: string) {
    this.router.navigateByUrl('/shop' + url);
    this.isMain = false;
  }

  back() {
    if (this.fromMain) {
      this.router.navigateByUrl('/shop');
    } else {
      window.history.back();
    }
  }

  home() {
    this.router.navigateByUrl('/home');
  }
}
