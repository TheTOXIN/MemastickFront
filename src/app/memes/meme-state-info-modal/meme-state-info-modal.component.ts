import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EvolveStep} from '../../consts/EvolveStep';
import {evolveIcons, memeIcons} from '../../consts/IconsData';
import {evolveStepDescription, evolveStepText, memeTypeDescription, memeTypeText} from '../../consts/TextData';
import {MemeType} from '../../consts/MemeType';

@Component({
  selector: 'app-evolve-step-info-modal',
  templateUrl: './meme-state-info-modal.component.html',
  styleUrls: ['./meme-state-info-modal.component.scss']
})
export class MemeStateInfoModalComponent implements OnInit{

  @Input()
  public step: EvolveStep;

  @Input()
  public type: MemeType;

  public titl = '';
  public icon = '';
  public text = '';
  public desc = '';

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {
    if (this.step != null) {
      this.init(
        'ЭТАП ЭВОЛЮЦИИ',
        evolveIcons[this.step],
        evolveStepText[this.step],
        evolveStepDescription[this.step]
      );
    } else if (this.type != null) {
      this.init(
        'ТИП МЕМА',
        memeIcons[this.type],
        memeTypeText[this.type],
        memeTypeDescription[this.type]
      );
    }
  }

  private init(titl, icon, text, desc) {
    this.titl = titl;
    this.icon = icon;
    this.text = text;
    this.desc = desc;
  }
}
