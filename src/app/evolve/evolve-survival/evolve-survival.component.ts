import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenType} from '../../consts/TokenType';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';

@Component({
  selector: 'app-evolve-survival',
  templateUrl: './evolve-survival.component.html',
  styleUrls: ['./evolve-survival.component.scss']
})
export class EvolveSurvivalComponent implements OnInit {

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
    this.type = TokenType.ANTIBIOTIC;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  chance() {
    this.status = LoaderStatus.LOAD;
    this.message = 'Применить антибиотик?';
    this.tokenAccept.show();
  }

  acceptTokenResult(accpet: boolean) {
    if (accpet) {
      this.increaseChance();
    } else {
      this.status = LoaderStatus.NONE;
    }
  }

  increaseChance() {
    this.tokenAcceptApi.accept(this.evolve.memeId, this.type).subscribe(
      () => this.successChance(),
      (error) => this.errorChance(error)
    );
  }

  successChance() {
    this.evolve.canApplyToken = false;
    this.evolve.immunity = true;
    this.message = 'Иммунитет увеличен!';
    this.status = LoaderStatus.DONE;
  }

  errorChance(error: any) {
    this.message = ErrorHandlerService.tokenError(error.error.code);
    this.status = LoaderStatus.ERROR;
  }
}
