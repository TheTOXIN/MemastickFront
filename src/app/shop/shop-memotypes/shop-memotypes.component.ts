import {Component, OnInit, ViewChild} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {Memotype} from '../../model/memotype/Memotype';
import {PriceConst} from '../../consts/PriceConst';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeRarityModalComponent} from '../../memotype/memotype-rarity-modal/memotype-rarity-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {MemotypeViewComponent} from '../../memotype/memotype-view/memotype-view.component';
import {MemeFilter} from '../../consts/MemeFilter';

@Component({
  selector: 'app-shop-memotypes',
  templateUrl: './shop-memotypes.component.html',
  styleUrls: ['./shop-memotypes.component.scss']
})
export class ShopMemotypesComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;
  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  public collection: MemotypeSet[] = [];

  public currentSet: MemotypeSet;
  public currentMemotype: Memotype;

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  public memotypePrice: number;
  public memotypeCarousel: any;

  isLoad = true;
  isMemotype = false;
  isSet = false;

  constructor(
    private memotypeApi: MemotypeApiService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {
    this.memotypeRarities = memotypeRarities;
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.memotypePrice = 0;

    this.initCarousel();
  }

  ngOnInit() {
    this.memotypeApi.all().subscribe(data => {
      this.collection = data.content;
      this.checkRoute();
      this.isLoad = false;
    });
  }

  checkRoute() {
    this.route.queryParams.subscribe(params => {
      const setName: MemeFilter = params.set;
      if (setName != null) {
        for (const set of this.collection) {
          if (set.name === setName) {
            this.chooseSet(set);
            break;
          }
        }
      }
    });
  }

  buy() {
    this.memotypeApi.buy(this.currentMemotype.id).subscribe(
      () => this.button.buyDone(),
      (data) => this.button.buyError(data)
    );
  }

  dropSet() {
    this.isSet = false;
    this.isMemotype = false;
  }

  chooseSet(set: MemotypeSet) {
    this.currentSet = set;
    this.isSet = true;
  }

  chooseMemotype(memotype: Memotype) {
    if (this.currentMemotype != null) this.currentMemotype.isChoose = false;

    this.currentMemotype = memotype;
    this.memotypePrice = PriceConst.MEMOTYPE * memotype.level;
    this.isMemotype = true;

    memotype.isChoose = true;
  }

  viewMemotype() {
    this.view.viewShow(this.currentMemotype);
  }

  showRarities() {
   this.modalService.open(MemotypeRarityModalComponent, {'centered': true});
  }

  toCollection() {
    this.router.navigateByUrl('/memotype/collection');
  }

  private initCarousel() {
    this.memotypeCarousel = {
      loop: false,
      margin: 15,
      nav: true,
      dots: false,
      rewindNav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 3
        },
        768: {
          items: 4
        },
        992: {
          items: 5
        },
        1368: {
          items: 6
        }
      }
    };
  }
}
