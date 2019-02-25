import {Component} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../services/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent {

  private meme: Meme;

  public evolve: EvolveMeme;
  public types = [];

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
    this.evolveApi.evolveMeme(this.meme.id).subscribe(evolve => this.evolve = evolve);
    this.isPreview = true;
  }

  researchClose() {
    this.isPreview = false;
  }

  dipricated() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.3 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }
}
