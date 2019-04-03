import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenType} from '../../consts/TokenType';

@Component({
  selector: 'app-token-accept',
  templateUrl: './token-accept.component.html',
  styleUrls: ['./token-accept.component.scss']
})
export class TokenAcceptComponent implements OnInit {

  @Output()
  public accept = new EventEmitter<boolean>();

  private icons = [];
  private type: TokenType;

  public isShow = false;

  constructor() {
    this.icons[TokenType.CREATING] = 'assets/images/tokens/1.png';
    this.icons[TokenType.FITNESS] = 'assets/images/tokens/2.png';
    this.icons[TokenType.MUTATION] = 'assets/images/tokens/3.png';
    this.icons[TokenType.CROSSOVER] = 'assets/images/tokens/4.png';
    this.icons[TokenType.SELECTION] = 'assets/images/tokens/5.png';
  }

  ngOnInit() {

  }

  acceptEvent(res: boolean) {
    this.accept.emit(res);
  }

  show(type: TokenType) {
    this.type = type;
    this.isShow = true;
  }

  yes() {
    this.acceptEvent(true);
    this.isShow = false;
  }

  no() {
    this.acceptEvent(false);
    this.isShow = false;
  }
}
