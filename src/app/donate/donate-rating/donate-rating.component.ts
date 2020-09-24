import {Component, Input, OnInit} from '@angular/core';
import {memotypeColors, memotypeLvl, memotypeNames} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {DonateRating} from '../model/DonateRating';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-donate-rating',
  templateUrl: './donate-rating.component.html',
  styleUrls: ['./donate-rating.component.scss']
})
export class DonateRatingComponent implements OnInit {

  @Input()
  public rating: Map<MemotypeRarity, DonateRating[]>;

  readonly memotypeColors = memotypeColors;
  readonly memotypeLvl = memotypeLvl;
  readonly memotypeNames = memotypeNames;

  readonly cost = GlobalConst.DONATE_RATE;

  raritySiquence = [];
  donatesCarousel: any;

  isLoad = false;

  constructor() {
    this.initCarousel();
    this.initSequence();
  }

  ngOnInit() {
    if (this.rating != null) {
      this.isLoad = true;
    }
  }

  close() {
    window.history.back();
  }

  public initSequence() {
    this.raritySiquence[0] = MemotypeRarity.INCREDIBLE;
    this.raritySiquence[1] = MemotypeRarity.LEGENDARY;
    this.raritySiquence[2] = MemotypeRarity.EPIC;
    this.raritySiquence[3] = MemotypeRarity.RARE;
    this.raritySiquence[4] = MemotypeRarity.CLASSIC;
  }

  private initCarousel() {
    this.donatesCarousel = {
      loop: true,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      center: true,
      margin: 10
    };
  }
}
