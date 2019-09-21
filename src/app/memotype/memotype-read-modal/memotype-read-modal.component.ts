import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';
import {MemotypeApiService} from '../../api/memotype-api-service';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {DomSanitizer} from '@angular/platform-browser';
import {Memotype} from '../../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype-view/memotype-view.component';

@Component({
  selector: 'app-memotype-read-modal',
  templateUrl: './memotype-read-modal.component.html',
  styleUrls: ['./memotype-read-modal.component.scss']
})
export class MemotypeReadModalComponent implements OnInit {

  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  @Input()
  public memetickId: UUID;

  public collection: MemotypeSet[] = [];

  public memotypeColors;
  public memotypeNames;

  isLoad = true;

  constructor(
    public activeModal: NgbActiveModal,
    private memotypeApi: MemotypeApiService
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.memotypeApi.read(this.memetickId).subscribe(data => {
      this.collection = data.content;
      this.isLoad = false;
    });
  }

  viewMemotype(memotype: Memotype) {
    if (memotype.count === 0) { return; }
    this.view.viewShow(memotype);
  }
}
