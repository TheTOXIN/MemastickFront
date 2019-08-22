import {Component, Input, OnInit} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';

@Component({
  selector: 'app-memotype-set-modal',
  templateUrl: './memotype-set-modal.component.html',
  styleUrls: ['./memotype-set-modal.component.scss']
})
export class MemotypeSetModalComponent implements OnInit {

  @Input()
  public set: MemotypeSet;

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
    this.memotypeRarities = memotypeRarities;
  }

  ngOnInit() {
  }
}
