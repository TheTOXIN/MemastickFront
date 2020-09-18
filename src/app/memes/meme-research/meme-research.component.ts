import {Component, Input, OnInit} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {evolveIcons, memeIcons} from '../../consts/IconsData';
import {EvolveStep} from '../../consts/EvolveStep';
import {evolveStepDescription, evolveStepText, memeTypeDescription, memeTypeText} from '../../consts/TextData';
import {CardOptions} from '../../options/card-options';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent implements OnInit {

  @Input()
  public options: CardOptions;

  @Input()
  public meme: Meme; // TODO ЮЗАТЬ ДАННЫЕ ОТСЮДА ВМЕСТО EVOLVE

  public evolve: EvolveMeme;

  public typeIcons;
  public typesText;

  public stepIcons;
  public stepText;

  public typeMeme = MemeType;
  public stepEvlv = EvolveStep;

  public isPreview = false;
  public isLoading = true;

  readonly typeDescription;
  readonly stepDescription;

  constructor(
    private evolveApi: EvolveMemeApiService
  ) {
    this.typeIcons = memeIcons;
    this.typesText = memeTypeText;

    this.stepIcons = evolveIcons;
    this.stepText = evolveStepText;

    this.typeDescription = memeTypeDescription;
    this.stepDescription = evolveStepDescription;
  }

  ngOnInit(): void {
    if (this.options != null) {
      this.meme = this.options.meme;
    }

    if (this.meme != null) {
      this.isPreview = true;
      this.initEvolve();
    }
  }

  initEvolve() {
    this.evolveApi.evolveMeme(this.meme.id).subscribe(evolve => {
      this.evolve = evolve;
      this.isLoading = false;
    });
  }
}
