import {Component, Input, OnInit} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {tokenIcons} from '../../model/TokenData';
import {TokenType} from '../../consts/TokenType';
import {AcceptService} from '../../services/accept-service';

@Component({
  selector: 'app-evolve-crossing',
  templateUrl: './evolve-crossing.component.html',
  styleUrls: ['./evolve-crossing.component.scss']
})
export class EvolveCrossingComponent implements OnInit {

  @Input()
  public evolve: EvolveMeme;

  public type;
  public img;

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.CROSSOVER;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }
}
