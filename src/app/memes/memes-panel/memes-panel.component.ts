import {Component, Inject, Input, OnInit} from '@angular/core';
import {EvolveStep} from '../../consts/EvolveStep';
import {Router} from '@angular/router';
import {WINDOW} from '../../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../../consts/MemeFilter';
import {StorageService} from '../../services/storage-service';
import {evolveIcons, filterIcons} from '../../consts/IconsData';

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
    private storage: StorageService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.evolveIcons = evolveIcons;
    this.filterIcons = filterIcons;
  }

  ngOnInit() {
    if (this.modePanel === MemeFilter.POOL) {
      this.needStepList = true;
    }
  }

  update() {
    this.storage.remMemePage(this.modePanel);
    window.location.reload();
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
