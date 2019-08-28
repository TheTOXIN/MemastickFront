import {Component} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';

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
