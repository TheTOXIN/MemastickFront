import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {EvolveMeme} from '../../model/EvolveMeme';
import {TokenAcceptApiService} from '../../api/token-accept-api.service';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {tokenIcons} from '../../model/TokenData';
import {TokenType} from '../../consts/TokenType';
import {MemeLoh} from '../../model/meme/MemeLoh';
import {MemeLohApiService} from '../../api/meme-loh-api-service';
import {ErrorHandlerService} from '../../services/error-handler-service';
import {TokenAccept} from '../../model/tokens/TokenAccept';
import {Options} from 'ng5-slider';
import {LohRadarComponent} from '../../shared/loh-radar/loh-radar.component';
import {AcceptService} from '../../services/accept-service';
import {LoaderState} from '../../state/loader-state';

@Component({
  selector: 'app-evolve-fitness',
  templateUrl: './evolve-fitness.component.html',
  styleUrls: ['./evolve-fitness.component.scss']
})
export class EvolveFitnessComponent implements OnInit {

  @ViewChild(LohRadarComponent) lohRadar: LohRadarComponent;

  public loader: LoaderState = new LoaderState();

  public type;
  public img;

  public lohPoints = 10;
  public myLoh: MemeLoh = new MemeLoh(0 , 0, 0);

  @Input()
  public evolve: EvolveMeme;

  public sliderOptions: Options = {
    floor: 0,
    ceil: 10,
    vertical: true,
    showSelectionBar: true,
    hideLimitLabels: true
  };

  constructor(
    private acceptService: AcceptService,
    private tokenAcceptApi: TokenAcceptApiService,
  ) {
    this.type = TokenType.SCOPE;
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {

  }

  sliderEvent() {
    this.lohPoints = 10 - (this.myLoh.lol + this.myLoh.omg + this.myLoh.hmm);
  }

  updateLoh() {
    this.lohRadar.updateData(this.myLoh);
  }

  fitness() {
    if (this.lohPoints !== 0) { return; }

    this.loader.status = LoaderStatus.LOAD;
    this.loader.message = 'Подтвердить оценку?';

    this.acceptService.accept({img: this.img}).then(
      () => this.makeFitness(),
      () => this.loader.status = LoaderStatus.NONE
    );
  }

  makeFitness() {
    this.tokenAcceptApi.acceptLoh(this.evolve.memeId, this.type, this.myLoh).subscribe(
      () => this.successFitness(),
      (error) => this.errorFitness(error)
    );
  }

  successFitness() {
    this.evolve.canApplyToken = false;
    this.loader.message = 'Мем оценен!';
    this.loader.status = LoaderStatus.DONE;
  }

  errorFitness(error: any) {
    this.loader.message = ErrorHandlerService.tokenError(error.error.code);
    this.loader.status = LoaderStatus.ERROR;
  }
}
