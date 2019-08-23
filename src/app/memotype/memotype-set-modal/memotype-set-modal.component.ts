import {Component, Input, OnInit} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-memotype-set-modal',
  templateUrl: './memotype-set-modal.component.html',
  styleUrls: ['./memotype-set-modal.component.scss']
})
export class MemotypeSetModalComponent implements OnInit {

  @Input()
  public set: MemotypeSet;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
