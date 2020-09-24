import {Component, Input, OnInit} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenType} from '../../consts/TokenType';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {tokenIcons} from '../../model/TokenData';
import {AcceptService} from '../../services/accept-service';
import {LoaderService} from '../../services/loader-service';

@Component({
  selector: 'app-evolve-survival',
  templateUrl: './evolve-survival.component.html',
  styleUrls: ['./evolve-survival.component.scss']
})
export class EvolveSurvivalComponent implements OnInit {

  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private loaderService: LoaderService,
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.ANTIBIOTIC;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  chance() {
    this.acceptService.accept({img: this.img}).then(
      () => this.increaseChance(),
      () => this.loaderService.setNone()
    );
  }

  increaseChance() {
    this.loaderService.setLoad('Лечим антибиотиком');

    this.tokenAcceptApi.accept(this.evolve.memeId, this.type).subscribe(
      () => this.successChance(),
      (error) => this.errorChance(error)
    );
  }

  successChance() {
    this.evolve.canApplyToken = false;
    this.evolve.immunity = true;
    this.loaderService.setDone('Иммунитет увеличен!');
  }

  errorChance(error: any) {
    this.loaderService.setError(
      ErrorHandlerService.tokenError(error.error.code)
    );
  }
}
