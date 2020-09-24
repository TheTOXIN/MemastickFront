import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start-info-modal',
  templateUrl: './start-info-modal.component.html',
  styleUrls: ['./start-info-modal.component.scss']
})
export class StartInfoModalComponent implements OnInit {

  public inofs = [{
    title: 'ЭВОЛЮЦИЯ',
    text: 'здесь находятся все мемы которые проходят алгоритм эволюции',
    image: 'assets/images/icon/world.png',
  },{
    title: 'КЛЕТКА',
    text: 'клетка используется для создания своих мемов',
    image: 'assets/images/icon/cell.png',
  },{
    title: 'ПОСОБИЕ',
    text: 'пособие выдают каждый день, в нем находятся токены',
    image: 'assets/images/icon/allowance.png',
  },{
    title: 'БИТВЫ',
    text: 'тут происходят жестокие битвы между мемами, ты тоже можешь принять участие в этом',
    image: 'assets/images/icon/battle.png',
  },{
    title: 'МАЙНИНГ',
    text: 'используй кирку чтобы заработать себе местной валюты',
    image: 'assets/images/icon/mining.png',
  },{
    title: 'МЕМОТИПЫ',
    text: 'коллекционные предметы в виде стикеров, можно использовать в чатах',
    image: 'assets/images/icon/memotype.png',
  },{
    title: 'МАГАЗИН',
    text: 'приобретай различные товары и услуги за мемкойны',
    image: 'assets/images/icon/shop.png',
  },{
    title: 'РЕЙТИНГ',
    text: 'рейтинг лучших меметиков в разных областях',
    image: 'assets/images/icon/rocket.png',
  },{
    title: 'БИБЛИОТЕКА',
    text: 'подкрепись новыми и более подробными знаниями об проекте',
    image: 'assets/images/icon/books.png',
  }];

  constructor(
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
  }
}
