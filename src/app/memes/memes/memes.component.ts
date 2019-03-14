import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {EvolveStep} from '../../consts/EvolveStep';
import {ActivatedRoute} from '@angular/router';
import {MemeFilter} from '../../consts/MemeFilter';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  @ViewChild(MemeViewComponent) view: MemeViewComponent;
  @ViewChild(MemeResearchComponent) research: MemeResearchComponent;

  constructor(
    public pagination: MemesPaginationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let filter = params.filter;
      const sort = 'creating';

      if (filter === undefined || filter == null || filter === '') { filter = MemeFilter.EVLV; }

      this.pagination.init(
        3,
        sort,
        true,
        filter
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
