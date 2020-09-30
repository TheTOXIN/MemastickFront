import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesPaginationService} from '../../services/memes-pagination.service';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {Meme} from '../../model/Meme';
import {ActivatedRoute, Router} from '@angular/router';
import {MemeFilter} from '../../consts/MemeFilter';
import {GlobalConst} from '../../consts/GlobalConst';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from '../../services/storage-service';
import {AlgorithmModalComponent} from '../../modals/algorithm-modal/algorithm-modal.component';
import {EvolveStep} from '../../consts/EvolveStep';

@Component({
  selector: 'app-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {

  @ViewChild(MemeViewComponent) view: MemeViewComponent;

  public filter: MemeFilter;
  public step: EvolveStep;

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
      const memetick = params.memetick;

      let filter: MemeFilter = params.filter;
      let step: EvolveStep = null;

      if (filter === undefined || filter == null) {
        filter = MemeFilter.POOL;
      }

      if (filter === MemeFilter.STEP) {
        step = params.step;
      }

      this.filter = filter;
      this.step = step;

      this.pagination.init(
        GlobalConst.MEME_BATCH,
        'creating',
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

  moreHandler() {
    this.pagination.more();
  }

  memeView(meme: Meme) {
    this.view.viewShow(meme);
  }

  toStart() {
    this.router.navigateByUrl('/start');
  }
}
