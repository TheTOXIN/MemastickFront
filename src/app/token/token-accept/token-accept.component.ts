import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TokenType} from '../../consts/TokenType';
import {tokenIcons, tokensData} from '../../model/TokenData';

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
    this.icons = tokenIcons;
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
