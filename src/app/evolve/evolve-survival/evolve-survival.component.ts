import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenApiService} from '../../api/token-api-service';
import {TokenType} from '../../consts/TokenType';
import {TokenAcceptComponent} from '../../token/token-accept/token-accept.component';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {ErrorStatus} from '../../consts/ErrorStatus';
import {ErrorHandlerService} from '../../services/error-handler-service';

@Component({
  selector: 'app-evolve-survival',
  templateUrl: './evolve-survival.component.html',
  styleUrls: ['./evolve-survival.component.scss']
})
export class EvolveSurvivalComponent implements OnInit {

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

  chance() {
    this.status = LoaderStatus.LOAD;
    this.message = 'Применить антибиотик?';
    this.tokenAccept.show(TokenType.ANTIBIOTIC);
  }

  acceptAntibioticResult(accpet: boolean) {
    if (accpet) {
      this.increaseChance();
    } else {
      this.status = LoaderStatus.NONE;
    }
  }

  increaseChance() {
    this.tokenAcceptApi.accept(this.evolve.memeId, TokenType.ANTIBIOTIC).subscribe(
      () => this.successChance(),
      (error) => this.errorChance(error)
    );
  }

  successChance() {
    this.evolve.immunity = true;
    this.message = 'Иммунитет увеличен!';
    this.status = LoaderStatus.DONE;
  }

  errorChance(error: any) {
    this.message = ErrorHandlerService.tokenError(error.error.code);
    this.status = LoaderStatus.ERROR;
  }
}
