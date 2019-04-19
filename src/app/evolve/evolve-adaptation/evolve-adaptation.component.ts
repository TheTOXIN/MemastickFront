import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptComponent} from '../../token/token-accept/token-accept.component';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenType} from '../../consts/TokenType';

@Component({
  selector: 'app-evolve-adaptation',
  templateUrl: './evolve-adaptation.component.html',
  styleUrls: ['./evolve-adaptation.component.scss']
})
export class EvolveAdaptationComponent implements OnInit {

  @ViewChild(TokenAcceptComponent) tokenAccept: TokenAcceptComponent;

  public status;
  public message;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.status = LoaderStatus.NONE;
    this.message = '';
  }

  ngOnInit() {
  }

  adaptation() {
    this.status = LoaderStatus.LOAD;
    this.message = 'Применить пробирку?';
    this.tokenAccept.show(TokenType.TUBE);
  }

  acceptTubeResult(accept: boolean) {
    if (accept) {
      this.increaseAdaptation();
    } else {
      this.status = LoaderStatus.NONE;
    }
  }

  increaseAdaptation() {
    this.tokenAcceptApi.accept(this.evolve.memeId, TokenType.TUBE).subscribe(
      () => this.successAdaptation(),
      () => this.errorAdaptation()
    );
  }

  successAdaptation() {
    this.evolve.immunity = true;
    this.message = 'Мем адаптировался!';
    this.status = LoaderStatus.DONE;
  }

  errorAdaptation() {
    this.message = 'Нужен токен адаптации!';
    this.status = LoaderStatus.ERROR;
  }
}
