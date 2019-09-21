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
      this.isLoad = false;
    });
  }

  toShop() {
    this.router.navigateByUrl('/shop/memotypes');
  }

  back() {
    window.history.back();
  }

  initCarousel() {
    this.collectionCarousel = {
      loop: true,
      nav: true,
      dots: true,
      rewindNav: true,
      autoHeight: true,
      items: 1
    };
  }
}
