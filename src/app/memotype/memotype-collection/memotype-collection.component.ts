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

  constructor(
    private memotypeApi: MemotypeApiService,
    private modalService: NgbModal
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.memotypeApi.collection().subscribe(data => {
      this.collection = data.content;
      this.isLoad = false;
    });
  }

  setModal(set: MemotypeSet) {
    const modalRef = this.modalService.open(MemotypeSetModalComponent, {'centered': true});
    modalRef.componentInstance.set = set;
  }

  viewMemotype(memotype: Memotype) {
    this.view.viewShow(memotype);
  }
}
