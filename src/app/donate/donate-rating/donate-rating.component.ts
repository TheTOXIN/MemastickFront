import { Component, OnInit } from '@angular/core';
import {DonateApiService} from '../../api/donate-api-service';
import {DONAT} from '../../app.constants';
import {memotypeColors, memotypeLvl, memotypeNames} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donate-rating',
  templateUrl: './donate-rating.component.html',
  styleUrls: ['./donate-rating.component.scss']
})
export class DonateRatingComponent implements OnInit {

  raritySiquence = [];

  public memotypeColors = memotypeColors;
  public memotypeLvl = memotypeLvl;
  public memotypeNames = memotypeNames;

  isLoad = true;
  donatHref = DONAT;

  public donatesCarousel: any;
  public rating: any;

  constructor(
    private router: Router,
    private donateApi: DonateApiService
  ) {
    this.initCarousel();
    this.initSiquence();
  }

  ngOnInit() {
    this.donateApi.readRating().subscribe(data => {
      this.rating = data;
      this.isLoad = false;
    });
  }

  toMsgs() {
    this.router.navigateByUrl('/donate');
  }

  toDonat() {
    window.open(this.donatHref, '_blank');
  }

  close() {
    window.history.back();
  }

  public initSiquence() {
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
