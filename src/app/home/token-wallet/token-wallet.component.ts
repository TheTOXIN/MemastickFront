import {Component, OnInit} from '@angular/core';
import {TokenApiService} from '../../services/token-api-service';
import {TokenType} from '../../consts/TokenType';
import {TokenData} from '../../model/TokenData';

@Component({
  selector: 'app-token-wallet',
  templateUrl: './token-wallet.component.html',
  styleUrls: ['./token-wallet.component.scss']
})
export class TokenWalletComponent implements OnInit {

  public tokens: TokenData[];

  constructor(
    private tokensApi: TokenApiService
  ) {
  }

  ngOnInit() {
    this.tokensApi.my().subscribe(data => {
      this.tokens = [
        new TokenData(
          'assets/images/tokens/1.png',
          'Пробирка',
          'Токен создания',
          'используется для создания нового мема',
          data.wallet[TokenType.CREATING]
        ),
        new TokenData(
          'assets/images/tokens/2.png',
          'Фитнесс',
          'Токен оценки',
          'даёт 30 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)',
          data.wallet[TokenType.FITNESS]
        ),
        new TokenData(
          'assets/images/tokens/3.png',
          'Мутаген',
          'Токен мутации',
          'с его помощью можно оставлять комментарии под мемами',
          data.wallet[TokenType.MUTATION]
        ),
        new TokenData(
          'assets/images/tokens/4.png',
          'Кроссовер',
          'Токен скрещивания',
          'позволяет создать новый мем на основе дргуих мемов',
          data.wallet[TokenType.CROSSOVER]
        ),
        new TokenData(
          'assets/images/tokens/5.png',
          'Антибиотик',
          'Токен отбора',
          'гарантирует 100% выживаемость мема',
          data.wallet[TokenType.SELECTION]
        )
      ];
    });
  }
}
