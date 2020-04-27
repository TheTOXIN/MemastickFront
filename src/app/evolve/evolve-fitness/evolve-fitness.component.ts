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

@Component({
  selector: 'app-evolve-fitness',
  templateUrl: './evolve-fitness.component.html',
  styleUrls: ['./evolve-fitness.component.scss']
})
export class EvolveFitnessComponent implements OnInit {

  @ViewChild(AcceptComponent) tokenAccept: AcceptComponent;
  @ViewChild(LohRadarComponent) lohRadar: LohRadarComponent;

  public status;
  public message;
  public type;
  public img;

  public lohPoints = 10;
  public loh: MemeLoh;
  public myLoh: MemeLoh = new MemeLoh(0, 0, 0);
  public lohLoad = false;

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
    private tokenAcceptApi: TokenAcceptApiService,
    private memeLohApi: MemeLohApiService
  ) {
    this.type = TokenType.SCOPE;
    this.status = LoaderStatus.NONE;
    this.message = '';
    this.img = tokenIcons[this.type];
  }

  ngOnInit() {
    this.memeLohApi.read(this.evolve.memeId).subscribe(data => {
      this.loh = data;
      this.lohLoad = true;
    });
  }

  sliderEvent() {
    this.lohPoints = 10 - (this.myLoh.lol + this.myLoh.omg + this.myLoh.hmm);
  }

  updateLoh() {
    this.lohRadar.updateData(this.myLoh);
  }

  fitness() {
    if (this.lohPoints !== 0) { return; }

    this.status = LoaderStatus.LOAD;
    this.message = 'Подтвердить оценку?';
    this.tokenAccept.show();
  }

  acceptTokenResult(accept: boolean) {
    if (accept) {
      this.makeFitness();
    } else {
      this.status = LoaderStatus.NONE;
    }
  }

  makeFitness() {
    this.tokenAcceptApi.acceptLoh(this.evolve.memeId, this.type, this.myLoh).subscribe(
      () => this.successFitness(),
      (error) => this.errorFitness(error)
    );
  }

  successFitness() {
    this.message = 'Мем оценен!';
    this.status = LoaderStatus.DONE;
  }

  errorFitness(error: any) {
    this.message = ErrorHandlerService.tokenError(error.error.code);
    this.status = LoaderStatus.ERROR;
  }
}
