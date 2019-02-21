import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {EvolveStep} from '../../consts/EvolveStep';

@Component({
  selector: 'app-evolve-step-info-modal',
  templateUrl: './evolve-step-info-modal.component.html',
  styleUrls: ['./evolve-step-info-modal.component.scss']
})
export class EvolveStepInfoModalComponent {

  @Input()
  public step: EvolveStep;

  public evolveInfos = [];

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.evolveInfos[EvolveStep.BIRTH] = 'assets/images/ss/1.png';
    this.evolveInfos[EvolveStep.SURVIVAL] = 'assets/images/ss/2.png';
  }

}
