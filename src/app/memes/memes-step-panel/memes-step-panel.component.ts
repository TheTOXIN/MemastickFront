import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {EvolveStep} from '../../consts/EvolveStep';
import {Router} from '@angular/router';
import {WINDOW} from '../../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-memes-step-panel',
  templateUrl: './memes-step-panel.component.html',
  styleUrls: ['./memes-step-panel.component.scss']
})
export class MemesStepPanelComponent implements OnInit {

  @Input()
  public showStepPanel = true;
  public showStepList = false;

  private evolveIcons = [];

  currentStep: any;

  steps = [{
    name: 'Адапитирующие',
    step: EvolveStep.ADAPTATION
  }, {
    name: 'Выживающие',
    step: EvolveStep.SURVIVAL
  }, {
    name: 'Все мемы',
    step: null
  }];

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.currentStep = this.steps[2];

    // TODO refactor
    this.evolveIcons[EvolveStep.ADAPTATION] = 'assets/images/steps/1.png';
    this.evolveIcons[EvolveStep.SURVIVAL] = 'assets/images/steps/2.png';
    this.evolveIcons[null] = 'assets/images/tokens/tmp.png';
  }

  ngOnInit() {
  }

  memesByStep(step: any) {
    this.showStepList = false;
    this.currentStep = step;

    this.router.navigate(['/memes'], {queryParams: {step: step.step}});
  }
}
