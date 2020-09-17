import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {DomSanitizer} from '@angular/platform-browser';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';
import {Meme} from '../../model/Meme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-memotype-read-modal',
  templateUrl: './memotype-read-modal.component.html',
  styleUrls: ['./memotype-read-modal.component.scss']
})
export class MemotypeReadModalComponent implements OnInit {

  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  @Input()
  public memetickId: UUID;

  @Input()
  public collection: MemotypeSet[];

  @Input()
  public selectMode: boolean = false;

  @Output()
  public selectEvent = new EventEmitter<Memotype>();

  public memotypeColors;
  public memotypeNames;

  isLoad = true;
  memotypesCarousel: any;

  constructor(
    public activeModal: NgbActiveModal,
    private memotypeApi: MemotypeApiService,
    private router: Router
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.initMemotypes();
    this.initCarousel();
  }

  initMemotypes() {
    if (this.collection != null) {
      this.isLoad = false;
      return;
    }

    this.memotypeApi.read(this.memetickId).subscribe(data => {
      this.collection = data.content;
      this.isLoad = false;
    });
  }

  clickMemotype(memotype: Memotype) {
    if (memotype.count === 0) { return; }

    if (this.selectMode) {
      this.selectEvent.emit(memotype);
      this.activeModal.close();

      return;
    }

    this.view.viewShow(memotype);
  }

  toShop() {
    this.router.navigateByUrl('/shop/memotypes');
    this.activeModal.close();
  }

  initCarousel() {
    this.memotypesCarousel = {
      loop: true,
      nav: false,
      dots: true,
      rewindNav: false,
      autoHeight: false,
      lazyLoad: true,
      items: 1
    };
  }
}
