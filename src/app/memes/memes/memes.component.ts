import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeFilter} from '../../consts/MemeFilter';
import {GlobalConst} from '../../consts/GlobalConst';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from '../../services/storage-service';
import {AlgorithmModalComponent} from '../../modals/algorithm-modal/algorithm-modal.component';
import {MemetickCardComponent} from '../../memetick/memetick-card/memetick-card.component';
import {MemetickPreview} from '../../model/MemetickPreview';
import {UUID} from 'angular2-uuid';
import {CardService} from '../../services/card-service';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  @ViewChild(MemeViewComponent) view: MemeViewComponent;

  public modePanel: MemeFilter;

  constructor(
    public pagination: MemesPaginationService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private storage: StorageService
  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let filter: MemeFilter = params.filter;

      const memetick = params.memetick;
      const step = params.step;
      const sort = 'creating';

      if (filter === undefined || filter == null) {
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

    this.checkEvolveInfo();
  }

  private checkEvolveInfo() {
    if (this.storage.showEvolveInfo()) {
      this.modalService.open(AlgorithmModalComponent, {'centered': true});
    }
  }

  ngOnDestroy() {
    this.pagination.destroy();
  }

  scrollHandler(e) {
    if (e === 'more') {
      this.pagination.more();
    }
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }
}
