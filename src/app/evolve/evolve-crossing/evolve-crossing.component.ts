import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {TokenType} from '../../consts/TokenType';
import {AcceptService} from '../../services/accept-service';

@Component({
  selector: 'app-evolve-crossing',
  templateUrl: './evolve-crossing.component.html',
  styleUrls: ['./evolve-crossing.component.scss']
})
export class EvolveCrossingComponent implements OnInit {

  public status;
  public message;
  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.CROSSOVER;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }
}
