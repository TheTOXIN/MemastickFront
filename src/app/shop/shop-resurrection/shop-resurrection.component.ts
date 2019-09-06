import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {PriceConst} from '../../consts/PriceConst';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeApiService} from '../../api/meme-api-service';
import {MemeFilter} from '../../consts/MemeFilter';
import {UUID} from 'angular2-uuid';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-shop-resurrection',
  templateUrl: './shop-resurrection.component.html',
  styleUrls: ['./shop-resurrection.component.scss']
})
export class ShopResurrectionComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public price = PriceConst.RESSURECTION;
  public filter = MemeFilter.DEAD;

  public memeId: UUID;

  constructor(
    public memeApi: MemeApiService
  ) {

  }

  ngOnInit() {

  }

  choose(event) {
    this.memeId = event;
  }

  buy() {
    if (this.memeId == null) { return; }
    this.memeApi.memeResurrect(this.memeId).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }
}
