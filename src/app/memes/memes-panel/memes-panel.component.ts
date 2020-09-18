import {Component, Inject, Input, OnInit} from '@angular/core';
import {EvolveStep} from '../../consts/EvolveStep';
import {Router} from '@angular/router';
import {WINDOW} from '../../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../../consts/MemeFilter';
import {StorageService} from '../../services/storage-service';
import {evolveIcons, filterIcons} from '../../consts/IconsData';
import {evolveStepText, memeTypeText} from '../../consts/TextData';
import {MemeType} from '../../consts/MemeType';

@Component({
  selector: 'app-memes-panel',
  templateUrl: './memes-panel.component.html',
  styleUrls: ['./memes-panel.component.scss']
})
export class MemesPanelComponent implements OnInit {

  @Input() public showPanel = true;
  @Input() public modePanel: MemeFilter;

  public needPanelList = false;
  public showPanelList = false;

  private readonly evolveIcons = [];
  private readonly filterIcons = [];

  currentStep: any = null;
  currentFilter: any = null;

  isUpdate = false;
  panelImage = filterIcons[MemeFilter.POOL];

  steps = [{
    name: evolveStepText[EvolveStep.ADAPTATION],
    step: EvolveStep.ADAPTATION
  }, {
    name: evolveStepText[EvolveStep.FITNESS],
    step: EvolveStep.FITNESS
  }, {
    name: evolveStepText[EvolveStep.MUTATION],
    step: EvolveStep.MUTATION
  }, {
    name: evolveStepText[EvolveStep.CROSSING],
    step: EvolveStep.CROSSING
  }, {
    name: evolveStepText[EvolveStep.SURVIVAL],
    step: EvolveStep.SURVIVAL
  }];

  filters = [{
    name: 'Эволюция',
    filter: MemeFilter.POOL,
  }, {
    name: 'Индивиды',
    filter: MemeFilter.INDV,
  }, {
    name: 'Отбор',
    filter: MemeFilter.SLCT,
  }, {
    name: 'Свои',
    filter: MemeFilter.SELF,
  }, {
    name: 'Лайки',
    filter: MemeFilter.LIKE,
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
      this.needPanelList = true;
    }

    if (this.storage.getMemePage(this.modePanel) !== 0) {
      this.isUpdate = true;
    }
  }

  update() {
    this.isUpdate = false;
    this.storage.remMemePage(this.modePanel);

    window.location.reload();
  }

  show() {
    if (this.needPanelList) {
      this.showPanelList = !this.showPanelList;
    }
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  memesByStep(step: any) {
    this.showPanelList = false;

    this.currentStep = step;
    this.panelImage = this.evolveIcons[step.step];

    this.router.navigate(['/memes'], {queryParams: {step: step.step}});
  }

  memesByFilter(filter: any) {
    this.showPanelList = false;

    this.currentFilter = filter;
    this.panelImage = this.filterIcons[filter.filter];

    this.router.navigate(['/memes'], {queryParams: {filter: filter.filter}});
  }
}
