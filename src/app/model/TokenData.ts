import {TokenType} from '../consts/TokenType';

export class TokenData {

  public type: TokenType;
  public image: string;
  public name: string;
  public designation: string;
  public description: string;

  constructor(type: TokenType, image: string, name: string, designation: string, description: string) {
    this.type = type;
    this.image = image;
    this.name = name;
    this.designation = designation;
    this.description = description;
  }
}

export const tokensData = [
  new TokenData(
    TokenType.TUBE,
    'assets/images/tokens/1.png',
    'Пробирка',
    'Токен адаптации',
    'адаптирует мем продвигая его вверх в списке'
  ),
  new TokenData(
    TokenType.SCOPE,
    'assets/images/tokens/2.png',
    'Микроскоп',
    'Токен оценки',
    'даёт 10 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)'
  ),
  new TokenData(
    TokenType.MUTAGEN,
    'assets/images/tokens/3.png',
    'Мутаген',
    'Токен мутации',
    'с его помощью можно оставлять комментарии под мемами'
  ),
  new TokenData(
    TokenType.CROSSOVER,
    'assets/images/tokens/4.png',
    'Кроссовер',
    'Токен скрещивания',
    'позволяет создать новый мем на основе других мемов'
  ),
  new TokenData(
    TokenType.ANTIBIOTIC,
    'assets/images/tokens/5.png',
    'Антибиотик',
    'Токен выживания',
    'даёт иммунитет мему, гарантируя выживаемость'
  )
];

export const tokenIcons = [];

tokenIcons[TokenType.TUBE] = tokensData[0].image;
tokenIcons[TokenType.SCOPE] = tokensData[1].image;
tokenIcons[TokenType.MUTAGEN] = tokensData[2].image;
tokenIcons[TokenType.CROSSOVER] = tokensData[3].image;
tokenIcons[TokenType.ANTIBIOTIC] = tokensData[4].image;

