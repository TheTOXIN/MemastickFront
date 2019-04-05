import {Component, Input, OnInit} from '@angular/core';
import {TokenApiService} from '../../api/token-api-service';
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

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {
  }

  // TODO change name tokens and move data to modals
  ngOnInit() {
    this.tokens = [
      new TokenData(
        'assets/images/tokens/1.png',
        'Пробирка',
        'Токен создания',
        'используется для создания нового мема',
        this.wallet[TokenType.CREATING]
      ),
      new TokenData(
        'assets/images/tokens/2.png',
        'Фитнесс',
        'Токен оценки',
        'даёт 30 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)',
        this.wallet[TokenType.FITNESS]
      ),
      new TokenData(
        'assets/images/tokens/3.png',
        'Мутаген',
        'Токен мутации',
        'с его помощью можно оставлять комментарии под мемами',
        this.wallet[TokenType.MUTATION]
      ),
      new TokenData(
        'assets/images/tokens/4.png',
        'Кроссовер',
        'Токен скрещивания',
        'позволяет создать новый мем на основе других мемов',
        this.wallet[TokenType.CROSSOVER]
      ),
      new TokenData(
        'assets/images/tokens/5.png',
        'Антибиотик',
        'Токен отбора',
        'даёт иммунитет для выживаемости мема',
        this.wallet[TokenType.SELECTION]
      )
    ];
  }

  showInfo(token: TokenData) {
    const modalRef = this.modalService.open(TokenInfoModalComponent);
    modalRef.componentInstance.token = token;
  }
}
