import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {PriceConst} from '../../consts/PriceConst';
import {MemeFilter} from '../../consts/MemeFilter';
import {UUID} from 'angular2-uuid';
import {TranslatorApiService} from '../../api/translator-api-service';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';

@Component({
  selector: 'app-shop-publish',
  templateUrl: './shop-publish.component.html',
  styleUrls: ['./shop-publish.component.scss']
})
export class ShopPublishComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public price = PriceConst.PUBLISH;
  public filter = MemeFilter.SELF;

  public memeId: UUID;

  constructor(
    private translatorApi: TranslatorApiService
  ) { }

  ngOnInit() {
  }

  choose(event) {
    this.memeId = event;
  }

  buy() {
    this.translatorApi.userPublish(this.memeId).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }
}
