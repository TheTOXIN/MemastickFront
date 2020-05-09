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

@Component({
  selector: 'app-evolve-adaptation',
  templateUrl: './evolve-adaptation.component.html',
  styleUrls: ['./evolve-adaptation.component.scss']
})
export class EvolveAdaptationComponent implements OnInit {

  public loader: LoaderState = new LoaderState();

  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.TUBE;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  adaptation() {
    this.loader.status = LoaderStatus.LOAD;
    this.loader.message = 'Применить пробирку?';

    this.acceptService.accept({img: this.img}).then(
      () => this.increaseAdaptation(),
      () => this.loader.status = LoaderStatus.NONE
    );
  }

  increaseAdaptation() {
    this.tokenAcceptApi.accept(this.evolve.memeId, this.type).subscribe(
      () => this.successAdaptation(),
      (error) => this.errorAdaptation(error)
    );
  }

  successAdaptation() {
    this.evolve.canApplyToken = false;
    this.evolve.adaptation++;
    this.loader.message = 'Мем адаптировался!';
    this.loader.status = LoaderStatus.DONE;
  }

  errorAdaptation(error: any) {
    this.loader.message = ErrorHandlerService.tokenError(error.error.code);
    this.loader.status = LoaderStatus.ERROR;
  }
}
