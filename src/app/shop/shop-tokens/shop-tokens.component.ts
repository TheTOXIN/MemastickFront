import {Component, OnInit, ViewChild} from '@angular/core';
import {TokenData, tokensData} from '../../model/TokenData';
import {PriceConst} from '../../consts/PriceConst';
import {ShopApiService} from '../../api/shop-api-service';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {TokenInfoModalComponent} from '../../modals/token-info-modal/token-info-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';

@Component({
  selector: 'app-shop-tokens',
  templateUrl: './shop-tokens.component.html',
  styleUrls: ['./shop-tokens.component.scss']
})
export class ShopTokensComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public tokens: TokenData[];
  public currentToken: TokenData;

  public tokenPrice = 0;
  public tokenCount = 1;

  isToken = false;

  constructor(
    private shopApi: ShopApiService,
    private modalService: NgbModal,
  ) {
    this.tokens = tokensData;
  }

  ngOnInit() {
  }

  dropToken() {
    this.isToken = false;
  }

  chooseToken(token: TokenData) {
    this.currentToken = token;
    this.isToken = true;
    this.computePrice(this.tokenCount);
  }

  computePrice(count) {
    if (this.currentToken != null) {
      this.tokenCount = count;
      this.tokenPrice = PriceConst.TOKENS * this.currentToken.lvl * count;
    }
  }

  buyToken() {
    this.shopApi.tokens(this.currentToken.type, this.tokenCount).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }

  tokenInfo() {
    const modalRef = this.modalService.open(TokenInfoModalComponent, {'centered': true});
    modalRef.componentInstance.token = this.currentToken;
  }
}
