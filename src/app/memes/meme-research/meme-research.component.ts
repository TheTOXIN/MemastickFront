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
import {BattleApiService} from '../../api/battle-api-service';
import {MemesModalComponent} from '../memes-modal/memes-modal.component';
import {MemeFilter} from '../../consts/MemeFilter';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent {

  public meme: Meme;

  public evolve: EvolveMeme;
  public types = [];

  isLoading = true;
  isPreview = false;

  constructor(
    private evolveApi: EvolveMemeApiService
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
    });
  }

  researchClose() {
    this.isPreview = false;
  }
}
