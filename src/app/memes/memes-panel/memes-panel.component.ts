import {Component, Inject, Input, OnInit} from '@angular/core';
import {EvolveStep} from '../../consts/EvolveStep';
import {ActivatedRoute, Router} from '@angular/router';
import {WINDOW} from '../../shared/services/windows.service';
import {DOCUMENT} from '@angular/common';
import {MemeFilter} from '../../consts/MemeFilter';
import {StorageService} from '../../services/storage-service';
import {evolveIcons, filterIcons} from '../../consts/IconsData';
import {evolveStepText} from '../../consts/TextData';

@Component({
  selector: 'app-memes-panel',
  templateUrl: './memes-panel.component.html',
  styleUrls: ['./memes-panel.component.scss']
})
export class MemesPanelComponent implements OnInit {

  @Input()
  public currentFilter: MemeFilter = MemeFilter.POOL;
  @Input()
  public currentStep: EvolveStep = EvolveStep.ADAPTATION;

  public needPanelList = false;
  public showPanelList = false;

  private readonly evolveIcons = [];
  private readonly filterIcons = [];

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
    name: 'Особь',
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
    private route: ActivatedRoute,
    private storage: StorageService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
    this.evolveIcons = evolveIcons;
    this.filterIcons = filterIcons;
  }

  ngOnInit() {
    if (this.storage.getMemePage(this.currentFilter) !== 0) {
      this.isUpdate = true;
    }

    this.panelImage = filterIcons[this.currentFilter];

    if (this.currentFilter === MemeFilter.STEP) {
      this.panelImage = evolveIcons[this.currentStep];
    }

    this.needPanelList = true;
  }

  update() {
    this.isUpdate = false;
    this.storage.remMemePage(this.currentFilter);

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

    this.router.navigate(['/memes'], {queryParams: {filter: MemeFilter.STEP, step: step.step}});
  }

  memesByFilter(filter: any) {
    this.showPanelList = false;

    this.currentFilter = filter;
    this.panelImage = this.filterIcons[filter.filter];

    this.router.navigate(['/memes'], {queryParams: {filter: filter.filter}});
  }
}
