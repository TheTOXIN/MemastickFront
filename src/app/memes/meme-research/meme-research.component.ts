import {Component} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EvolveStepInfoModalComponent} from '../../modals/evolve-step-info-modal/evolve-step-info-modal.component';
import {EvolveStep} from '../../consts/EvolveStep';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent {

  public meme: Meme;

  public evolve: EvolveMeme;
  public types = [];

  public chance: number;

  isLoading = true;
  isPreview = false;
  isChance = false;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
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

  dipricated() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.4 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }
}
