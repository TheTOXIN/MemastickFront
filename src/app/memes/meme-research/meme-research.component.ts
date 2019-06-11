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
  public types = []; // TODO token refactor

  isLoading = true;
  isPreview = false;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private evolveApi: EvolveMemeApiService
  ) {
    this.types[MemeType.EVOLVE] = 'ЭВОЛЮЦИОНИРУЕТ';
    this.types[MemeType.DEATH] = 'МЁРТВ';
    this.types[MemeType.INDIVID] = 'ОСОБЬ';
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

  dipricated() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.4 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }
}
