import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {TokenType} from '../../consts/TokenType';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {AcceptService} from '../../services/accept-service';
import {LoaderState} from '../../state/loader-state';

@Component({
  selector: 'app-evolve-survival',
  templateUrl: './evolve-survival.component.html',
  styleUrls: ['./evolve-survival.component.scss']
})
export class EvolveSurvivalComponent implements OnInit {

  public loader: LoaderState = new LoaderState();

  public type;
  public img;

  @Input()
  public evolve: EvolveMeme;

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService
  ) {
    this.type = TokenType.ANTIBIOTIC;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
  }

  chance() {
    this.loader.status = LoaderStatus.LOAD;
    this.loader.message = 'Применить антибиотик?';

    this.acceptService.accept({img: this.img}).then(
      () => this.increaseChance(),
      () => this.loader.status = LoaderStatus.NONE
    );
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
    this.loader.message = 'Иммунитет увеличен!';
    this.loader.status = LoaderStatus.DONE;
  }

  errorChance(error: any) {
    this.loader.message = ErrorHandlerService.tokenError(error.error.code);
    this.loader.status = LoaderStatus.ERROR;
  }
}
