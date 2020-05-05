import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../consts/MemeFilter';
import {filterIcons} from '../../consts/IconsData';
import {MemeApiService} from '../../api/meme-api-service';
import {Meme} from '../../model/Meme';
import {MemeViewComponent} from '../meme-view/meme-view.component';
import {MemeResearchComponent} from '../meme-research/meme-research.component';
import {MemePaginationConfig} from '../../iface/MemePaginationConfig';
import {BattleConst} from '../../consts/BattleConst';

@Component({
  selector: 'app-memes-modal',
  templateUrl: './memes-modal.component.html',
  styleUrls: ['./memes-modal.component.scss']
})
export class MemesModalComponent implements OnInit {

  @ViewChild(MemeViewComponent) viewComponent: MemeViewComponent;
  @ViewChild(MemeResearchComponent) researchComponent: MemeResearchComponent;

  @Input()
  public filter: MemeFilter;

  @Input()
  public title = 'МЕМЫ:';

  @Output()
  public event: EventEmitter<Meme>;

  public icon: string;
  public memes: Meme[] = [];

  isEmpty = false;
  isLoad = true;

  costBattle = BattleConst.MAX_PVP;

  private config: MemePaginationConfig;

  constructor(
    public activeModal: NgbActiveModal,
    private memeApi: MemeApiService
  ) {
    this.event = new EventEmitter();
  }

  ngOnInit() {
    this.icon = filterIcons[this.filter];
    this.loadMemes();
  }

  private loadMemes() {
    this.config = {
      filter: this.filter,
      sort: 'creating,desc',
      page: 0,
      size: 100
    };

    this.memeApi.memeRead(this.config).subscribe((data) => {
      this.memes = data;
      this.isEmpty = this.memes.length === 0;
      this.isLoad = false;
    });
  }

  view(meme: Meme) {
    this.viewComponent.viewShow(meme);
  }

  research(meme: Meme) {
    this.researchComponent.researchShow(meme);
  }

  choose(meme: Meme) {
    this.event.emit(meme);
    this.activeModal.close('success');
  }
}
