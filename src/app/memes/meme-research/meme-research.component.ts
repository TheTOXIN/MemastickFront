import {Component, ViewChild} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AcceptComponent} from '../../shared/accpet/accept.component';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {ErrorCode} from '../../consts/ErrorCode';
import {MemeApiService} from '../../api/meme-api-service';
import {PriceConst} from '../../consts/PriceConst';
import {BattleRequestModalComponent} from '../../battle/battle-request-modal/battle-request-modal.component';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent {

  @ViewChild(AcceptComponent) resurrectAccept: AcceptComponent;

  public meme: Meme;

  public evolve: EvolveMeme;
  public types = [];

  public chance: number;

  public loadMessage = '';
  public loadStatus = LoaderStatus.NONE;

  public resurrectPrice = PriceConst.RESSURECTION;

  isLoading = true;
  isPreview = false;
  isChance = false;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private memeApi: MemeApiService,
    public evolveApi: EvolveMemeApiService
  ) {
    this.types[MemeType.EVLV] = 'ЭВОЛЮЦИЯ';
    this.types[MemeType.SLCT] = 'ОТБОР';
    this.types[MemeType.DEAD] = 'МЁРТВ';
    this.types[MemeType.INDV] = 'ОСОБЬ';
  }

  researchShow(meme: Meme) {
    this.meme = meme;
    this.isPreview = true;

    this.evolveApi.evolveMeme(this.meme.id).subscribe(evolve => {
      this.evolve = evolve;
      this.isLoading = false;

      if (meme.type === MemeType.SLCT) {
        this.computeChance();
      }
    });
  }

  researchClose() {
    this.isPreview = false;
  }

  computeChance() {
    this.evolveApi.evolveMemeChance(this.meme.id).subscribe(chance => {
      this.chance = chance;
      this.isChance = true;
    });
  }

  resurrect() {
    this.resurrectAccept.show('-' + this.resurrectPrice);
  }

  resurrectAcceptResult(accept: boolean) {
    if (accept) {
      this.loadStatus = LoaderStatus.LOAD;
      this.loadMessage = 'Воскрешаем';
      this.memeApi.memeResurrect(this.meme.id).subscribe(
        () => this.resurrectDone(),
        (data) => this.resurrectError(data)
      );
    }
  }

  public resurrectDone() {
    this.loadStatus = LoaderStatus.DONE;
    this.loadMessage = 'Мем в отобре';
  }

  public resurrectError(data: any) {
    if (data.error.code === ErrorCode.MEME_COIN_ENOUGH) {
      this.loadMessage = 'Не хватает мемкойнов';
    } else {
      this.loadMessage = 'Ошибка воскрешения';
    }
    this.loadStatus = LoaderStatus.ERROR;
  }

  reqeust() {
    this.modalService.open(BattleRequestModalComponent, {'centered': true});
  }
}
