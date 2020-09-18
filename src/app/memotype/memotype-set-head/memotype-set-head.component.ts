import {Component, Input, OnInit} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeSetModalComponent} from '../memotype-set-modal/memotype-set-modal.component';
import {CardState} from '../../state/card-state.service';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-memotype-set-head',
  templateUrl: './memotype-set-head.component.html',
  styleUrls: ['./memotype-set-head.component.scss']
})
export class MemotypeSetHeadComponent implements OnInit {

  @Input()
  public set: MemotypeSet;

  @Input()
  public showCount = true;

  @Input()
  public showInfo = true;

  constructor(
    private modalService: NgbModal,
    private cardState: CardState,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  setModal(set: MemotypeSet) {
    const modalRef = this.modalService.open(MemotypeSetModalComponent, {'centered': true});
    modalRef.componentInstance.set = set;
  }

  toShop() {
    this.router.navigateByUrl('/shop/memotypes?set=' + this.set.name);

    if (this.cardState.modal != null) {
      this.cardState.modal.close();
    }
  }
}
