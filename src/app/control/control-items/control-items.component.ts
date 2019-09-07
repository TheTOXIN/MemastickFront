import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MemetickInventoryApiService} from '../../api/memetick-inventory-api-service';
import {MemetickInventory} from '../../model/MemetickInventory';
import {TokenAllowanceModalComponent} from '../../token/token-allowance-modal/token-allowance-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TokenData, tokensData} from '../../model/TokenData';
import {TokenInfoModalComponent} from '../../modals/token-info-modal/token-info-modal.component';
import {MemeCoinHistoryModalComponent} from '../../modals/meme-coin-history-modal/meme-coin-history-modal.component';

export class Item {
  constructor (
    public image: string,
    public name: string,
    public count: number,
    public action: any,
    public notify = false
  ) {

  }
}

@Component({
  selector: 'app-control-items',
  templateUrl: './control-items.component.html',
  styleUrls: ['./control-items.component.scss']
})
export class ControlItemsComponent implements OnInit {

  @Output()
  public closeEvent = new EventEmitter<any>();

  public loader = true;
  public data: MemetickInventory;

  public inventory: Item[] = [];
  public tokens: Item[] = [];

  constructor(
    private inventoryApi: MemetickInventoryApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.inventoryApi.readAll().subscribe(data => {
      this.data = data;

      this.initInventory();
      this.initTokens();

      this.loader = false;
    });
  }

  initInventory() {
    this.inventory = [];

    if (this.data.allowance) {
      this.inventory[this.inventory.length] = new Item(
        'assets/images/icon/allowance.png',
        'Пособие',
        1,
        () => this.openAllowance(),
        true
      );
    }

    if (this.data.cell) {
      this.inventory[this.inventory.length] = new Item(
        'assets/images/icon/cell_ico.png',
        'Клетка',
        1,
        () => this.toNavigate('/memes/create'),
        true
      );
    }

    if (this.data.pickaxe) {
      this.inventory[this.inventory.length] = new Item(
        'assets/images/icon/pickaxe.png',
        'Кирка',
        1,
        () => this.toNavigate('/home/mining'),
        true
      );
    }

    this.inventory[this.inventory.length] = new Item(
      'assets/images/icon/memecoin.png',
      'Мемкойны',
      this.data.memecoins,
      () => this.memecoinHistory()
    );

    this.inventory[this.inventory.length] = new Item(
      'assets/images/icon/cookie.png',
      'Печеньки',
      this.data.cookies,
      () => this.toNavigate('/shop/cookies')
    );
  }

  initTokens() {
    for (const token of tokensData) {
      this.tokens.push(new Item(
        token.image,
        token.name,
        this.data.wallet[token.type],
        () => this.tokenInfo(token)
      ));
    }
  }

  toNavigate(url: string) {
    this.router.navigateByUrl(url);
    this.closeEvent.emit(null);
  }

  tokenInfo(token: TokenData) {
    const modalRef = this.modalService.open(TokenInfoModalComponent);
    modalRef.componentInstance.token = token;
  }

  openAllowance() {
    const modalRef = this.modalService.open(TokenAllowanceModalComponent, {'centered': true});
    modalRef.result.then(() => {}, () => this.ngOnInit());
  }

  memecoinHistory() {
    this.modalService.open(MemeCoinHistoryModalComponent, {'centered': true});
  }
}
