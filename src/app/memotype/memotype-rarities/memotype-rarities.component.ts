import { Component, OnInit } from '@angular/core';
import {memotypeColors, memotypeNames, memotypeRarities} from '../../consts/MemotypeData';

@Component({
  selector: 'app-memotype-rarities',
  templateUrl: './memotype-rarities.component.html',
  styleUrls: ['./memotype-rarities.component.scss']
})
export class MemotypeRaritiesComponent implements OnInit {

  public memotypeRarities = [];
  public memotypeColors = [];
  public memotypeNames = [];

  constructor(

  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;
    this.memotypeRarities = memotypeRarities;
  }

  ngOnInit() {
  }
}
