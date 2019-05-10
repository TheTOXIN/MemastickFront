import { Component, OnInit } from '@angular/core';
import {MemetickInventoryApiService} from '../../api/memetick-inventory-api-service';
import {MemetickInventory} from '../../model/MemetickInventory';
import {TokenType} from '../../consts/TokenType';
import {TokenAllowanceModalComponent} from '../../token/token-allowance-modal/token-allowance-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

export class Item {
  constructor (
    public image: string,
    public name: string,
    public count: number,
    public action: any
  ) {

  }
}

@Component({
  selector: 'app-control-items',
  templateUrl: './control-items.component.html',
  styleUrls: ['./control-items.component.scss']
})
export class ControlItemsComponent implements OnInit {

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
        () => this.openAllowance()
      );
    }

    if (this.data.cell) {
      this.inventory[this.inventory.length] = new Item(
        'assets/images/icon/cell.png',
        'Клетка',
        1,
        () => this.router.navigateByUrl('/memes/create')
      );
    }
  }

  // TODO add events click
  initTokens() {
    this.tokens[0] = new Item(
      'assets/images/tokens/1.png',
      'Пробирка',
      this.data.wallet[TokenType.TUBE],
      () => console.log('TEST')
    );
    this.tokens[1] = new Item(
      'assets/images/tokens/2.png',
      'Фитнесс',
      this.data.wallet[TokenType.SCOPE],
      () => console.log('TEST')
    );
    this.tokens[2] = new Item(
      'assets/images/tokens/3.png',
      'Мутаген',
      this.data.wallet[TokenType.MUTAGEN],
      () => console.log('TEST')
    );
    this.tokens[3] = new Item(
      'assets/images/tokens/4.png',
      'Кроссовер',
      this.data.wallet[TokenType.CROSSOVER],
      () => console.log('TEST')
    );
    this.tokens[4] = new Item(
      'assets/images/tokens/5.png',
      'Антибиотик',
      this.data.wallet[TokenType.ANTIBIOTIC],
      () => console.log('TEST')
    );
  }

  openAllowance() {
    const modalRef = this.modalService.open(TokenAllowanceModalComponent, {'centered': true});
    modalRef.result.then(() => {}, () => this.ngOnInit());
  }
}
