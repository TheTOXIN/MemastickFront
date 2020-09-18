import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';
import {UUID} from 'angular2-uuid';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {Router} from '@angular/router';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {CardOptions} from '../../options/card-options';
import {CardState} from '../../state/card-state.service';

@Component({
  selector: 'app-memotypes-read',
  templateUrl: './memotypes-read.component.html',
  styleUrls: ['./memotypes-read.component.scss']
})
export class MemotypesReadComponent implements OnInit {

  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  @Input()
  public memetickId: UUID;

  @Input()
  public collection: MemotypeSet[];

  @Input()
  public options: CardOptions;

  public selectMode: boolean = false;
  public selectEventer: EventEmitter<Memotype>;

  public memotypeColors;
  public memotypeNames;

  isLoad = false;
  isEmpty = false;
  memotypesCarousel: any;

  constructor(
    private cardState: CardState,
    private memotypeApi: MemotypeApiService,
    private router: Router
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.initOptions();
    this.initMemotypes();
    this.initCarousel();
  }

  initOptions() {
    if (this.options != null && this.options.memotypes != null) {
      const om = this.options.memotypes;

      this.memetickId = om.memetickId;
      this.collection = om.collection;
      this.selectMode = om.selectMode;
      this.selectEventer = om.selectEvent;
    }
  }

  initMemotypes() {
    if (this.collection != null) {
      this.loadMemotypes();
      return;
    }

    this.memotypeApi.read(this.memetickId).subscribe(data => {
      this.collection = data.content;
      this.loadMemotypes();
    });
  }

  loadMemotypes() {
    this.isLoad = false;
    this.isEmpty = this.collection.length === 0;
  }

  clickMemotype(memotype: Memotype) {
    if (memotype.count === 0) { return; }

    if (this.selectMode) {
      this.selectEventer.emit(memotype);
      this.cardState.modal.close();
      return;
    }

    this.view.viewShow(memotype);
  }

  pressMemotype(memotype: Memotype) {
    this.view.viewShow(memotype);
  }

  toShop() {
    this.router.navigateByUrl('/shop/memotypes');
    this.cardState.modal.close();
  }

  initCarousel() {
    this.memotypesCarousel = {
      loop: true,
      nav: true,
      dots: true,
      rewindNav: false,
      autoHeight: true,
      lazyLoad: true,
      items: 1
    };
  }
}
