import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {PriceConst} from '../../consts/PriceConst';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {TokenAllowanceApiService} from '../../api/token-allowance-api-service';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenAllowanceModalComponent} from '../../token/token-allowance-modal/token-allowance-modal.component';

@Component({
  selector: 'app-shop-allowance',
  templateUrl: './shop-allowance.component.html',
  styleUrls: ['./shop-allowance.component.scss']
})
export class ShopAllowanceComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

  public price = PriceConst.ALLOWANCE;

  constructor(
    private allowanceApi: TokenAllowanceApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  buy() {
    this.allowanceApi.make().subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }

  allowance() {
    this.modalService.open(TokenAllowanceModalComponent, {'centered': true});
  }
}
