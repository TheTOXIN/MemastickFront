import { Component, OnInit } from '@angular/core';
import {DonaterApiService} from '../../api/donater-api-service';
import {DONAT} from '../../app.constants';
import {memotypeColors, memotypeLvl, memotypeNames} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donater-rating',
  templateUrl: './donater-rating.component.html',
  styleUrls: ['./donater-rating.component.scss']
})
export class DonaterRatingComponent implements OnInit {

  raritySiquence = [];

  public memotypeColors = memotypeColors;
  public memotypeLvl = memotypeLvl;
  public memotypeNames = memotypeNames;

  isLoad = true;
  donatHref = DONAT;

  public donatersCarousel: any;
  public rating: any;

  constructor(
    private router: Router,
    private donaterApi: DonaterApiService
  ) {
    this.initCarousel();
    this.initSiquence();
  }

  ngOnInit() {
    this.donaterApi.readRating().subscribe(data => {
      this.rating = data;
      this.isLoad = false;
    });
  }

  toMsgs() {
    this.router.navigateByUrl('/donaters/messages');
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
    this.donatersCarousel = {
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
