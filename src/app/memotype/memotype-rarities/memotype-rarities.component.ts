import {Component, Input, OnInit} from '@angular/core';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';
import {PriceConst} from '../../consts/PriceConst';

@Component({
  selector: 'app-memotype-rarities',
  templateUrl: './memotype-rarities.component.html',
  styleUrls: ['./memotype-rarities.component.scss']
})
export class MemotypeRaritiesComponent implements OnInit {

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  public price = PriceConst.MEMOTYPE;

  @Input()
  public withPrice = false;

  constructor(

  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
    this.memotypeRarities = memotypeRarities;
  }

  ngOnInit() {
  }
}
