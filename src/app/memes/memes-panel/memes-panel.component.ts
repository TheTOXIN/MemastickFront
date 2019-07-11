import {Component, Inject, Input, OnInit} from '@angular/core';
import {EvolveStep} from '../../consts/EvolveStep';
import {Router} from '@angular/router';
import {WINDOW} from '../../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../../consts/MemeFilter';

@Component({
  selector: 'app-memes-panel',
  templateUrl: './memes-panel.component.html',
  styleUrls: ['./memes-panel.component.scss']
})
export class MemesPanelComponent implements OnInit {

  @Input() public showPanel = true;
  @Input() public modePanel: MemeFilter;

  public needStepList = false;
  public showStepList = false;

  private evolveIcons = [];
  private filterIcons = [];

  currentStep: any = null;

  steps = [{
    name: 'Адаптация',
    step: EvolveStep.ADAPTATION
  }, {
    name: 'Оценка',
    step: EvolveStep.FITNESS
  }, {
    name: 'Мутация',
    step: EvolveStep.MUTATION
  }, {
    name: 'Скрещивание',
    step: EvolveStep.CROSSING
  }, {
    name: 'Выживание',
    step: EvolveStep.SURVIVAL
  }];

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.evolveIcons[EvolveStep.ADAPTATION] = 'assets/images/steps/1.png';
    this.evolveIcons[EvolveStep.FITNESS] = 'assets/images/steps/2.png';
    this.evolveIcons[EvolveStep.MUTATION] = 'assets/images/steps/3.png';
    this.evolveIcons[EvolveStep.CROSSING] = 'assets/images/steps/4.png';
    this.evolveIcons[EvolveStep.SURVIVAL] = 'assets/images/steps/5.png';

    this.filterIcons[MemeFilter.POOL] = 'assets/images/icon/world.png';
    this.filterIcons[MemeFilter.SLCT] = 'assets/images/icon/select.png';
    this.filterIcons[MemeFilter.INDV] = 'assets/images/icon/1.png';
    this.filterIcons[MemeFilter.SELF] = 'assets/images/icon/cell.png';
    this.filterIcons[MemeFilter.LIKE] = 'assets/images/icon/like_push.png';
    this.filterIcons[MemeFilter.USER] = 'assets/images/review.png';
  }

  ngOnInit() {
    if (this.modePanel === MemeFilter.POOL) {
      this.needStepList = true;
    }
  }

  update() {
    this.router.navigateByUrl('/memes');
    this.currentStep = null;
  }

  show() {
    if (this.needStepList) {
      this.showStepList = !this.showStepList;
    }
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  memesByStep(step: any) {
    this.showStepList = false;
    this.currentStep = step;

    this.router.navigate(['/memes'], {queryParams: {step: step.step}});
  }
}
