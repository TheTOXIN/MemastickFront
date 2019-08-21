import {Component, Input, OnInit} from '@angular/core';
import {MemotypeSet} from '../../model/memotype/MemotypeSet';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {MemotypeRarity} from '../../consts/MemotypeRarity';

@Component({
  selector: 'app-memotype-set-modal',
  templateUrl: './memotype-set-modal.component.html',
  styleUrls: ['./memotype-set-modal.component.scss']
})
export class MemotypeSetModalComponent implements OnInit {

  @Input()
  public set: MemotypeSet;

  public rarities: MemotypeRarity[] = [];

  public memotypeColors;
  public memotypeNames;

  constructor(
    public activeModal: NgbActiveModal
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
  }

  ngOnInit() {
    this.rarities[0] = MemotypeRarity.CLASSIC;
    this.rarities[1] = MemotypeRarity.RARE;
    this.rarities[2] = MemotypeRarity.EPIC;
    this.rarities[3] = MemotypeRarity.LEGENDARY;
    this.rarities[4] = MemotypeRarity.INCREDIBLE;
  }
}
