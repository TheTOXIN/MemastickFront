import {Component, Inject, Input, OnInit} from '@angular/core';
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

  private tmpIcon = 'NULL';
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
    step: this.tmpIcon
  }];

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.currentStep = this.steps[2];

    // TODO refactor and make hide when scroll
    this.evolveIcons[EvolveStep.ADAPTATION] = 'assets/images/steps/1.png';
    this.evolveIcons[EvolveStep.SURVIVAL] = 'assets/images/steps/2.png';
    this.evolveIcons[this.tmpIcon] = 'assets/images/tokens/tmp.png';
  }

  ngOnInit() {
  }

  close() {
    this.router.navigateByUrl('/home');
  }

  memesByStep(step: any) {
    this.showStepList = false;
    this.currentStep = step;

    let value = step.sptep;
    if (this.currentStep.step === this.tmpIcon) { value = null; }

    this.router.navigate(['/memes'], {queryParams: {step: step.value}});
  }
}
