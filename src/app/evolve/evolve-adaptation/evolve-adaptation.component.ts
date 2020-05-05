import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenType} from '../../consts/TokenType';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';

@Component({
  selector: 'app-evolve-adaptation',
  templateUrl: './evolve-adaptation.component.html',
  styleUrls: ['./evolve-adaptation.component.scss']
})
export class EvolveAdaptationComponent implements OnInit {

  @ViewChild(AcceptComponent) tokenAccept: AcceptComponent;

  public status;
  public message;
  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.TUBE;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  adaptation() {
    this.status = LoaderStatus.LOAD;
    this.message = 'Применить пробирку?';
    this.tokenAccept.show();
  }

  acceptTokenResult(accept: boolean) {
    if (accept) {
      this.increaseAdaptation();
    } else {
      this.status = LoaderStatus.NONE;
    }
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
    this.message = 'Мем адаптировался!';
    this.status = LoaderStatus.DONE;
  }

  errorAdaptation(error: any) {
    this.message = ErrorHandlerService.tokenError(error.error.code);
    this.status = LoaderStatus.ERROR;
  }
}
