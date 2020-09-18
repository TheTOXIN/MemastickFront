import {Component, Input, OnInit} from '@angular/core';
import {TokenType} from '../../consts/TokenType';
import {TokenData, tokensData} from '../../model/TokenData';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenInfoModalComponent} from '../../modals/token-info-modal/token-info-modal.component';

@Component({
  selector: 'app-token-wallet',
  templateUrl: './token-wallet.component.html',
  styleUrls: ['./token-wallet.component.scss']
})
export class TokenWalletComponent implements OnInit {

  @Input()
  public wallet: any;

  @Input()
  public showMax = true;

  @Input()
  public blya = '';

  public tokens: TokenData[];

  public egg = 0;
  public showEgg = false;
  public secret = [TokenType.MUTAGEN, TokenType.CROSSOVER, TokenType.SCOPE, TokenType.ANTIBIOTIC, TokenType.TUBE];

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.tokens = tokensData;
  }

  showInfo(token: TokenData) {
    this.checkEgg(token);
    const modalRef = this.modalService.open(TokenInfoModalComponent);
    modalRef.componentInstance.token = token;
  }

  private checkEgg(token: TokenData) {
    if (this.secret[this.egg] === token.type) {
      this.egg++;
    } else {
      this.egg = 0;
    }

    if (this.egg === this.tokens.length) {
      this.showEgg = true;
      this.egg = 0;
    }
  }
}
