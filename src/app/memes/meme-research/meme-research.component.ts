import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {evolveIcons, memeIcons} from '../../consts/IconsData';
import {EvolveStep} from '../../consts/EvolveStep';
import {evolveStepText, memeTypeText} from '../../consts/TextData';
import {CardOptions} from '../../options/card-options';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent implements OnInit {

  @Input()
  public options: CardOptions;

  @Input()
  public meme: Meme;

  public evolve: EvolveMeme;

  public typeIcons;
  public typesText;

  public stepIcons;
  public stepText;

  public typeMeme = MemeType;
  public stepEvlv = EvolveStep;

  public isPreview = false;
  public isLoading = true;

  @Output()
  public closer = new EventEmitter();

  constructor(
    private evolveApi: EvolveMemeApiService
  ) {
    this.typeIcons = memeIcons;
    this.typesText = memeTypeText;

    this.stepIcons = evolveIcons;
    this.stepText = evolveStepText;
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
