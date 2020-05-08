import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Output} from '@angular/core';
import {Meme} from '../../model/Meme';
import {MemeType} from '../../consts/MemeType';
import {EvolveMemeApiService} from '../../api/evolve-meme-api-service';
import {EvolveMeme} from '../../model/EvolveMeme';
import {evolveIcons, memeIcons} from '../../consts/IconsData';
import {EvolveStep} from '../../consts/EvolveStep';
import {evolveStepText, memeTypeText} from '../../consts/TextData';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../shared/services/windows.service';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent implements OnInit {

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

  @Output()
  public closer = new EventEmitter<null>();

  constructor(
    private evolveApi: EvolveMemeApiService
  ) {
    this.typeIcons = memeIcons;
    this.typesText = memeTypeText;

    this.stepIcons = evolveIcons;
    this.stepText = evolveStepText;
  }

  ngOnInit(): void {
    if (this.meme != null) {
      this.isPreview = true;
      this.initEvolve();
    }
  }

  researchShow(meme: Meme) {
    this.meme = meme;
    this.isPreview = true;
    this.initEvolve();
  }

  initEvolve() {
    this.evolveApi.evolveMeme(this.meme.id).subscribe(evolve => {
      this.evolve = evolve;
      this.isLoading = false;
    });
  }

  researchClose() {
    this.closer.emit(null);
    this.meme = null;
    this.evolve = null;
    this.isLoading = true;
    this.isPreview = false;
  }
}
