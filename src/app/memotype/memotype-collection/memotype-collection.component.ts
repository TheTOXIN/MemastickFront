import {Component, OnInit, ViewChild} from '@angular/core';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors} from '../../consts/MemotypeData';
import {memotypeNames} from '../../consts/MemotypeData';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeSetModalComponent} from '../memotype-set-modal/memotype-set-modal.component';
import {MemeViewComponent} from '../../memes/meme-view/meme-view.component';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';
import {Memotype} from '../../model/memotype/Memotype';
import {Router} from '@angular/router';

@Component({
  selector: 'app-memotype-collection',
  templateUrl: './memotype-collection.component.html',
  styleUrls: ['./memotype-collection.component.scss']
})
export class MemotypeCollectionComponent implements OnInit {

  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  public collection: MemotypeSet[] = [];

  public memotypeColors;
  public memotypeNames;

  isLoad = true;

  collectionCarousel: any;

  constructor(
    private memotypeApi: MemotypeApiService,
    private router: Router
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.initCarousel();
  }

  ngOnInit() {
    this.memotypeApi.collection().subscribe(data => {
      this.collection = data.content;
      this.swapSet();
      this.isLoad = false;
    });
  }

  swapSet() {
    const index = Math.floor(Math.random() * this.collection.length);
    const first = this.collection[index];
    this.collection[index] = this.collection[0];
    this.collection[0] = first;
  }

  viewMemotype(memotype: Memotype) {
    if (memotype.count === 0) { return; }
    this.view.viewShow(memotype);
  }

  toShop(set: MemotypeSet) {
    this.router.navigateByUrl('/shop/memotypes?set=' + set.name);
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  initCarousel() {
    this.collectionCarousel = {
      loop: true,
      nav: true,
      dots: true,
      rewindNav: true,
      autoHeight: true,
      lazyLoad: true,
      items: 1
    };
  }
}
