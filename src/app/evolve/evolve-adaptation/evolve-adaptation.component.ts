import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenType} from '../../consts/TokenType';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {AcceptService} from '../../services/accept-service';
import {LoaderState} from '../../state/loader-state';
import {LoaderService} from '../../services/loader-service';

@Component({
  selector: 'app-evolve-adaptation',
  templateUrl: './evolve-adaptation.component.html',
  styleUrls: ['./evolve-adaptation.component.scss']
})
export class EvolveAdaptationComponent implements OnInit {

  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService,
    private loaderService: LoaderService
  ) {
    this.type = TokenType.TUBE;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  adaptation() {
    this.acceptService.accept({img: this.img}).then(
      () => this.increaseAdaptation(),
      () => this.loaderService.setNone()
    );
  }

  increaseAdaptation() {
    this.loaderService.setLoad('Применяем пробирку...');
    this.tokenAcceptApi.accept(this.evolve.memeId, this.type).subscribe(
      () => this.successAdaptation(),
      (error) => this.errorAdaptation(error)
    );
  }

  successAdaptation() {
    this.evolve.canApplyToken = false;
    this.evolve.adaptation++;
    this.loaderService.setDone('Мем адаптировался!');
  }

  errorAdaptation(error: any) {
    this.loaderService.setError(
      ErrorHandlerService.tokenError(error.error.code)
    );
  }
}
