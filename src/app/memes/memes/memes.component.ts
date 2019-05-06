import {Component, HostListener, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeFilter} from '../../consts/MemeFilter';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  @ViewChild(MemeViewComponent) view: MemeViewComponent;
  @ViewChild(MemeResearchComponent) research: MemeResearchComponent;

  public showStepPanel = false;

  constructor(
    public pagination: MemesPaginationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let filter = params.filter;
      const step = params.step;
      const sort = 'creating';

      if (filter === undefined || filter == null || filter === '') {
        filter = MemeFilter.POOL;
        this.showStepPanel = true;
      }

      this.pagination.init(
        3,
        sort,
        true,
        filter,
        step
      );
    });
  }

  ngOnDestroy() {
    this.pagination.destroy();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.pagination.more();
    }
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  memeResearch(meme: Meme) {
    this.research.researchShow(meme);
  }
}
