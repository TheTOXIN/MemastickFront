import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EvolveStep} from '../../consts/EvolveStep';
import {evolveIcons} from '../../consts/IconsData';
import {evolveStepDescription, evolveStepText} from '../../consts/TextData';

@Component({
  selector: 'app-evolve-step-info-modal',
  templateUrl: './evolve-step-info-modal.component.html',
  styleUrls: ['./evolve-step-info-modal.component.scss']
})
export class EvolveStepInfoModalComponent {

  @Input()
  public step: EvolveStep;

  public evolveIcons = [];
  public evolveText = [];
  public evolveDesc = [];

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.evolveIcons = evolveIcons;
    this.evolveText = evolveStepText;
    this.evolveDesc = evolveStepDescription;

  }
}
