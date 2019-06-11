import {Component, Input, OnInit} from '@angular/core';
import {TokenType} from '../../consts/TokenType';
import {TokenData} from '../../model/TokenData';
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

  public tokens: TokenData[];

  public egg = 0;
  public showEgg = false;
  public secret = [TokenType.MUTAGEN, TokenType.CROSSOVER, TokenType.SCOPE, TokenType.ANTIBIOTIC, TokenType.TUBE];

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
  }

  // TODO token refactor
  ngOnInit() {
    this.tokens = [
      new TokenData(
        TokenType.TUBE,
        'assets/images/tokens/1.png',
        'Пробирка',
        'Токен адаптации',
        'адаптирует мем продвигая его вверх в списке',
        this.wallet[TokenType.TUBE]
      ),
      new TokenData(
        TokenType.SCOPE,
        'assets/images/tokens/2.png',
        'Микроскоп',
        'Токен оценки',
        'даёт 30 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)',
        this.wallet[TokenType.SCOPE]
      ),
      new TokenData(
        TokenType.MUTAGEN,
        'assets/images/tokens/3.png',
        'Мутаген',
        'Токен мутации',
        'с его помощью можно оставлять комментарии под мемами',
        this.wallet[TokenType.MUTAGEN]
      ),
      new TokenData(
        TokenType.CROSSOVER,
        'assets/images/tokens/4.png',
        'Кроссовер',
        'Токен скрещивания',
        'позволяет создать новый мем на основе других мемов',
        this.wallet[TokenType.CROSSOVER]
      ),
      new TokenData(
        TokenType.ANTIBIOTIC,
        'assets/images/tokens/5.png',
        'Антибиотик',
        'Токен отбора',
        'даёт иммунитет мему, гарантируя выживаемость',
        this.wallet[TokenType.ANTIBIOTIC]
      )
    ];
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
