import {Component, Input, OnInit} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeSetModalComponent} from '../memotype-set-modal/memotype-set-modal.component';

@Component({
  selector: 'app-memotype-set-head',
  templateUrl: './memotype-set-head.component.html',
  styleUrls: ['./memotype-set-head.component.scss']
})
export class MemotypeSetHeadComponent implements OnInit {

  @Input()
  public set: MemotypeSet;

  constructor(
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  setModal(set: MemotypeSet) {
    const modalRef = this.modalService.open(MemotypeSetModalComponent, {'centered': true});
    modalRef.componentInstance.set = set;
  }
}
