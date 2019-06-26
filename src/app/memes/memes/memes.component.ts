import {Component, HostListener, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeFilter} from '../../consts/MemeFilter';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  @ViewChild(MemeViewComponent) view: MemeViewComponent;
  @ViewChild(MemeResearchComponent) research: MemeResearchComponent;

  public showPanel = true;
  public modePanel: MemeFilter;

  constructor(
    public pagination: MemesPaginationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let filter: MemeFilter = params.filter;

      const memetick = params.memetick;
      const step = params.step;
      const sort = 'creating';

      if (filter === undefined || filter == null || filter === '') {
        filter = MemeFilter.POOL;
      }

      this.modePanel = filter;

      this.pagination.init(
        GlobalConst.MEME_BATCH,
        sort,
        true,
        filter,
        step,
        memetick
      );
    });
  }

  ngOnDestroy() {
    this.pagination.destroy();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.pagination.more();
    } else if (e === 'up') {
      this.showPanel = true;
    } else if (e === 'down') {
      this.showPanel = false;
    }
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  memeResearch(meme: Meme) {
    this.research.researchShow(meme);
  }
}
