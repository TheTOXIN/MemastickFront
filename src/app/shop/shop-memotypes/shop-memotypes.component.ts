import {Component, OnInit, ViewChild} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {Memotype} from '../../model/memotype/Memotype';
import {PriceConst} from '../../consts/PriceConst';
import {ShopButtonComponent} from '../shared/shop-button/shop-button.component';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';

@Component({
  selector: 'app-shop-memotypes',
  templateUrl: './shop-memotypes.component.html',
  styleUrls: ['./shop-memotypes.component.scss']
})
export class ShopMemotypesComponent implements OnInit {

  @ViewChild(ShopButtonComponent) button: ShopButtonComponent;

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
    private modalService: NgbModal
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
      this.isLoad = false;
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
    this.currentMemotype = memotype;
    this.memotypePrice = PriceConst.MEMOTYPE * memotype.level;
    this.isMemotype = true;
  }

  showRarities() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.5 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }

  toCollection() {
    this.router.navigateByUrl('/memotype/collection');
  }

  private initCarousel() {
    this.memotypeCarousel = {
      loop: true,
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
