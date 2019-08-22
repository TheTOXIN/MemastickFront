import { Component, OnInit } from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeApiService} from '../../api/memotype-api-service';

@Component({
  selector: 'app-shop-memotypes',
  templateUrl: './shop-memotypes.component.html',
  styleUrls: ['./shop-memotypes.component.scss']
})
export class ShopMemotypesComponent implements OnInit {

  public collection: MemotypeSet[] = [];

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  isLoad = true;

  public memotypeCarousel: any;

  constructor(
    private memotypeApi: MemotypeApiService
  ) {
    this.memotypeRarities = memotypeRarities;
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.initCarousel();
  }

  ngOnInit() {
    this.memotypeApi.all().subscribe(data => {
      this.collection = data.content;
      this.isLoad = false;
    });
  }

  private initCarousel() {
    this.memotypeCarousel = {
      loop: true,
      margin: 15,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2,
          margin: 12
        },
        600: {
          items: 2
        },
        767: {
          items: 2
        },
        768: {
          items: 2,
          margin: 15
        },
        992: {
          items: 3
        },
        1000: {
          items: 3
        }
      }
    };
  }
}
