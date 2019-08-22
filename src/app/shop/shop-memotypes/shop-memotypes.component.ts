import { Component, OnInit } from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {Memotype} from '../../model/memotype/Memotype';
import {PriceConst} from '../../consts/PriceConst';

@Component({
  selector: 'app-shop-memotypes',
  templateUrl: './shop-memotypes.component.html',
  styleUrls: ['./shop-memotypes.component.scss']
})
export class ShopMemotypesComponent implements OnInit {

  public collection: MemotypeSet[] = [];

  public currentSet: MemotypeSet;
  public currentMemotype: Memotype;

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  public memotypeCarousel: any;
  public memotypePrice: number;

  isLoad = true;
  isChoose = false;
  message = 'Выберите мемотип';

  constructor(
    private memotypeApi: MemotypeApiService
  ) {
    this.memotypeRarities = memotypeRarities;
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.initCarousel();
    this.memotypePrice = 0;
  }

  ngOnInit() {
    this.memotypeApi.all().subscribe(data => {
      this.collection = data.content;
      this.currentSet = this.collection[Math.floor(Math.random() * this.collection.length)];
      this.isLoad = false;
    });
  }

  buy() {
    alert('BUY - ' + this.currentMemotype.title);
  }

  chooseMemotype(memotype: Memotype) {
    this.isChoose = true;
    this.currentMemotype = memotype;
    this.message = 'Выбран - ' + memotype.title;
    this.memotypePrice = PriceConst.MEMOTYPE * memotype.level;
  }

  private initCarousel() {
    this.memotypeCarousel = {
      loop: true,
      margin: 15,
      nav: true,
      dots: false,
      rewindNav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 3
        },
        768: {
          items: 4
        },
        992: {
          items: 5
        },
        1368: {
          items: 6
        }
      }
    };
  }
}
